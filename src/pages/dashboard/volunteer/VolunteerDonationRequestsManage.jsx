import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/axiosSecure";
import moment from "moment";
import Swal from "sweetalert2";

const VolunteerDonationRequestsManage = () => {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["donationRequests", statusFilter, page],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests", {
        params: {
          status: statusFilter === "all" ? undefined : statusFilter,
          page,
          limit,
        },
      });
      console.log("📦 API response data:", res.data);
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [statusFilter, page, refetch]);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  // const handleStatusUpdate = async (id, currentStatus) => {

  //   let nextStatus = null;
  //   if (currentStatus === "pending") nextStatus = "inprogress";
  //   else if (currentStatus === "inprogress") nextStatus = "done";

  //   if (!nextStatus) return;

  //   if (!window.confirm(`Change status to ${nextStatus}?`)) return;

  //   try {
  //     const res = await axiosSecure.patch(`/donation-requests/status/${id}`, {
  //       status: nextStatus,
  //     });
  //     if (res.data.modifiedCount > 0 || res.data.success) {
  //       alert(`Status updated to ${nextStatus}`);
  //       refetch();
  //     }
  //   } catch (err) {
  //     console.error("Error updating status:", err);
  //     alert("Failed to update status");
  //   }
  // };

  const handleStatusUpdate = async (id, currentStatus) => {
    let nextStatus = null;
    if (currentStatus === "pending") nextStatus = "inprogress";
    else if (currentStatus === "inprogress") nextStatus = "done";

    if (!nextStatus) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Change status to "${nextStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/donation-requests/status/${id}`, {
        status: nextStatus,
      });
      if (res.data.modifiedCount > 0 || res.data.success) {
        Swal.fire("Updated!", `Status changed to "${nextStatus}".`, "success");
        refetch();
      }
    } catch (err) {
      console.error("Error updating status:", err);
      Swal.fire("Failed!", "Failed to update status.", "error");
    }
  };

  // Simple Status badge function
  const StatusBadge = ({ status }) => {
    const colorMap = {
      pending: "bg-yellow-500",
      inprogress: "bg-blue-500",
      done: "bg-green-600",
      canceled: "bg-red-500",
    };
    return (
      <span
        style={{ padding: "4px 8px", borderRadius: 6, color: "white" }}
        className={colorMap[status] || "bg-gray-500"}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        All Donation Requests (Volunteer)
      </h2>

      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: 20 }}>Loading...</div>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          No donation requests found.
        </p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              minWidth: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ccc",
              textAlign: "left",
            }}
          >
            <thead style={{ backgroundColor: "#f7f7f7" }}>
              <tr>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>
                  Recipient
                </th>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>
                  District
                </th>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>Date</th>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>Status</th>
                <th style={{ padding: 8, border: "1px solid #ddd" }}>Update</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id} style={{ borderTop: "1px solid #ddd" }}>
                  <td style={{ padding: 8 }}>
                    {request.recipientName || "N/A"}
                  </td>
                  <td style={{ padding: 8 }}>
                    {request.recipientDistrict || "N/A"}
                  </td>
                  <td style={{ padding: 8 }}>
                    {request.requestedDate
                      ? new Date(request.requestedDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td style={{ padding: 8, textTransform: "capitalize" }}>
                    <StatusBadge status={request.status} />
                  </td>
                  <td style={{ padding: 8 }}>
                    {["pending", "inprogress"].includes(request.status) ? (
                      <button
                        onClick={() =>
                          handleStatusUpdate(request._id, request.status)
                        }
                        style={{
                          color: "#2563eb",
                          cursor: "pointer",
                          border: "none",
                          background: "none",
                          textDecoration: "underline",
                        }}
                      >
                        Update
                      </button>
                    ) : (
                      <span style={{ color: "#9ca3af" }}>Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: Math.ceil((requests.length || 1) / limit) }).map(
          (_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              style={{
                padding: "6px 12px",
                borderRadius: 4,
                border: "1px solid #ccc",
                backgroundColor: page === idx + 1 ? "#2563eb" : "white",
                color: page === idx + 1 ? "white" : "#000",
                cursor: "pointer",
              }}
            >
              {idx + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default VolunteerDonationRequestsManage;
