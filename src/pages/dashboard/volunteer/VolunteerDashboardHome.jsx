import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/axiosSecure";

const VolunteerDashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get(
          `/donation-requests/user/${user?.email}`
        );
        setRequests(res.data || []);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load donation requests.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchRequests();
    }
  }, [user?.email, axiosSecure]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/donation-requests/${id}`, {
        status: newStatus,
      });
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: newStatus } : req
        )
      );
      Swal.fire("Updated!", `Status changed to ${newStatus}.`, "success");
    } catch (err) {
      Swal.fire("Error!", "Failed to update status.", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This request will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/donation-requests/${id}`);
        if (res.data.deletedCount > 0) {
          setRequests((prev) => prev.filter((r) => r._id !== id));
          Swal.fire("Deleted!", "Request has been removed.", "success");
        }
      } catch (err) {
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  const recentRequests = requests
    .sort((a, b) => new Date(b.donationDate) - new Date(a.donationDate))
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome,{" "}
        <span className="text-blue-600">{user?.displayName || "Donor"}</span>
      </h2>

      {loading ? (
        <p className="text-center mt-10">Loading recent requests...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : recentRequests.length > 0 ? (
        <>
          <h3 className="text-xl font-semibold mb-2">
            Your Recent Donation Requests
          </h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Donation Date</th>
                  <th>Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req, index) => (
                  <tr key={req._id}>
                    <td>{index + 1}</td>
                    <td>{req.recipientName}</td>
                    <td>
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </td>
                    <td>{new Date(req.donationDate).toLocaleDateString()}</td>
                    <td>{req.donationTime}</td>
                    <td>{req.bloodGroup}</td>
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
                    <td className="space-x-1">
                      {req.status === "inprogress" && (
                        <>
                          <button
                            className="btn btn-xs btn-success"
                            onClick={() => handleStatusChange(req._id, "done")}
                          >
                            Done
                          </button>
                          <button
                            className="btn btn-xs btn-error"
                            onClick={() =>
                              handleStatusChange(req._id, "canceled")
                            }
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      <button
                        className="btn btn-xs btn-info"
                        onClick={() =>
                          navigate(`/dashboard/donation-request/${req._id}`)
                        }
                      >
                        View
                      </button>
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() =>
                          navigate(
                            `/dashboard/edit-donation-request/${req._id}`
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-xs btn-outline btn-error"
                        onClick={() => handleDelete(req._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/dashboard/my-requests")}
              className="btn btn-outline btn-primary"
            >
              View My All Requests
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default VolunteerDashboardHome;
