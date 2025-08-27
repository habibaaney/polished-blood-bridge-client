import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/axiosSecure";

const MyDonationRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const fetchRequests = async () => {
    try {
      const res = await axiosSecure.get(
        `/donation-requests/user/${user?.email}`
      );
      setRequests(res.data);
    } catch (err) {
      setError(err.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchRequests();
    }
  }, [user?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/donation-requests/${id}`);
        // if (res.data.deletedCount > 0) {
        //   Swal.fire("Deleted!", "Your request has been deleted.", "success");
        //   fetchRequests();
        // }
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your request has been deleted.", "success");

          // ✅ Update UI immediately
          setRequests((prevRequests) =>
            prevRequests.filter((req) => req._id !== id)
          );
        }
      } catch (error) {
        console.error("Error deleting request:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((req) => req.status === statusFilter);

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Donation Requests</h2>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label className="font-semibold">Filter by Status:</label>
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {filteredRequests.length === 0 ? (
        <p className="text-center text-gray-600">No donation requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Recipient</th>
                <th>District</th>
                <th>Upazila</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.map((req, index) => (
                <tr key={req._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{req.recipientName}</td>
                  <td>{req.recipientDistrict}</td>
                  <td>{req.recipientUpazila}</td>
                  <td>{new Date(req.donationDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        req.status === "pending"
                          ? "bg-yellow-500"
                          : req.status === "inprogress"
                          ? "bg-blue-500"
                          : req.status === "done"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() =>
                        navigate(`/dashboard/donation-request/${req._id}`)
                      }
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() =>
                        navigate(`/dashboard/edit-donation-request/${req._id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(req._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-6 gap-2">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`btn btn-sm ${
                  currentPage === idx + 1 ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
