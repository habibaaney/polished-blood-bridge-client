import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../pages/Loading";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/axiosSecure";

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log("Fetched users:", res.data);
      return res.data.data;
    },
  });

  const filteredUsers = users.filter((user) => {
    // console.log("🔍 Filtering User:", user);
    const statusMatch = filterStatus === "all" || user.status === filterStatus;
    const searchMatch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleStatusChange = async (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    try {
      // console.log("📤 Sending status change:", { userId, newStatus });

      const res = await axiosSecure.patch(`/users/status/${userId}`, {
        status: newStatus,
      });
      // console.log("📥 Status Update Response:", res.data);
      if (res.data.success) {
        toast.success(`User status changed to ${newStatus}`);
        refetch();
      } else {
        toast.error("Failed to change status");
      }
    } catch (err) {
      toast.error("Error updating status");
    }
  };

  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === "volunteer" ? "donor" : "volunteer";
    try {
      const res = await axiosSecure.patch(`/users/role/${userId}`, {
        role: newRole,
      });

      console.log("📥 Role Update Response:", res.data);
      if (res.data.success) {
        toast.success(`User role changed to ${newRole}`);
        refetch();
      } else {
        toast.error("Failed to change role");
      }
    } catch (err) {
      toast.error("Error updating role");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage All Users</h2>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex gap-4">
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>

          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border px-3 py-2 rounded"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Avatar</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              currentItems.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={user.avatar || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full"
                      onError={(e) => {
                        e.target.src = "https://i.ibb.co/4pDNDk1/avatar.png";
                      }}
                    />
                  </td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2 capitalize">{user.status}</td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex flex-col gap-2 items-end">
                      <button
                        onClick={() =>
                          handleStatusChange(user._id, user.status)
                        }
                        className={`text-sm px-2 py-1 rounded ${
                          user.status === "active"
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {user.status === "active" ? "Block" : "Unblock"}
                      </button>
                      <button
                        onClick={() => handleRoleChange(user._id, user.role)}
                        className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-600"
                      >
                        Change Role
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-600">
            Showing {indexOfFirstItem + 1} -{" "}
            {Math.min(indexOfLastItem, totalItems)} of {totalItems}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border rounded ${
                  page === currentPage ? "bg-blue-500 text-white" : ""
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
