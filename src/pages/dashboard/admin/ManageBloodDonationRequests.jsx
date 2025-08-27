import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/axiosSecure";

const ManageBloodDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get("/donation-requests");
        setRequests(res.data || []);
      } catch (err) {
        console.error("❌ Error fetching donation requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [axiosSecure]);

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
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "The request has been deleted.", "success");
          setRequests((prev) => prev.filter((r) => r._id !== id));
        }
      } catch (err) {
        Swal.fire("Error", "Failed to delete request", "error");
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/donation-requests/status/${id}`, {
        status: newStatus,
      });

      if (res.data.success) {
        Swal.fire("Updated!", "Status updated successfully", "success");
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: newStatus } : req
          )
        );
      } else {
        Swal.fire("Error", "Failed to update status", "error");
      }
    } catch (err) {
      console.error("Status update failed:", err);
      Swal.fire("Error", "Something went wrong!", "error");
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

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Donation Requests</h2>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-4">
        <label>Status Filter:</label>
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      {filteredRequests.length === 0 ? (
        <p className="text-center text-gray-500">No donation requests found.</p>
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
                <th>Change Status</th>
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
                  <td>
                    <select
                      className="select select-sm select-bordered"
                      value={req.status}
                      onChange={(e) =>
                        handleStatusChange(req._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="inprogress">In Progress</option>
                      <option value="done">Done</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, idx) => (
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

export default ManageBloodDonationRequests;
