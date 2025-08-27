import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/axiosSecure";
import {
  FaUsers,
  FaHandHoldingMedical,
  FaSpinner,
  FaDollarSign,
} from "react-icons/fa";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
// import Loading from "../../Loading";

const AdminDashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: stats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/admin-stats");
        console.log("Admin stats response:", res.data);
        return res.data;
      } catch (err) {
        console.error("Error fetching admin stats:", err);
        throw err;
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-lg text-gray-600">Loading...</span>
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="text-center text-red-600 font-bold">
        Error loading dashboard statistics. Please try again later.
        <div className="text-xs mt-2">{error?.message}</div>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Message Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-red-600">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome back,{" "}
          <span className="text-red-600">{user?.displayName || "Admin"}</span>!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's a summary of the platform's activity.
        </p>
      </div>

      {/* Featured Statistics Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
          <div>
            <p className="text-4xl font-extrabold">{stats.totalUsers || 0}</p>
            <p className="text-blue-100 mt-1">Total Users</p>
          </div>
          <FaUsers className="text-5xl text-blue-300" />
        </div>

        {/* Total Funding Card */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
          <div>
            {/* NOTE: Ensure your backend /admin-stats endpoint returns a 'totalFunding' field */}
            <p className="text-4xl font-extrabold">
              ${stats.totalFunding || 0}
            </p>
            <p className="text-green-100 mt-1">Total Funding</p>
          </div>
          <FaDollarSign className="text-5xl text-green-300" />
        </div>

        {/* Total Blood Donation Requests Card */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between transition-transform transform hover:scale-105">
          <div>
            <p className="text-4xl font-extrabold">
              {stats.totalRequests || 0}
            </p>
            <p className="text-red-100 mt-1">Donation Requests</p>
          </div>
          <FaHandHoldingMedical className="text-5xl text-red-300" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
