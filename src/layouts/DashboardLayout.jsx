import { Link, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-red-100 p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-red-700">Dashboard</h2>

        {/* Common Links */}
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard/profile">My Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/create-donation-request">
              Donation Request Form
            </Link>
          </li>
          <li>
            <Link to="/dashboard/my-requests">My Donation Requests</Link>
          </li>
          <li>
            <Link to="/dashboard/fundings">Fund Payment</Link>
          </li>

          {/* Role-Specific Links */}
          {user.role === "admin" && (
            <>
              <li>
                <Link to="/dashboard/admin-home">Admin Home</Link>
              </li>
              <li>
                <Link to="/dashboard/manage-users">Manage Users</Link>
              </li>
              <li>
                <Link to="/dashboard/manage-requests">
                  Manage Blood Donation Requests
                </Link>
              </li>
              <li>
                <Link to="/dashboard/blogs">Manage Blogs</Link>
              </li>
              <li>
                <Link to="/dashboard/add-blogs">Add Blog</Link>
              </li>
            </>
          )}

          {user.role === "donor" && (
            <>
              <li>
                <Link to="/dashboard/donor-home">Home</Link>
              </li>
              {/* <li>
                <Link to="/dashboard/my-requests">My Donation Requests</Link>
              </li> */}
              {/* <li>
                <Link to="/dashboard/donar-home">Donor Dashboard Home</Link>
              </li> */}
            </>
          )}

          {user.role === "volunteer" && (
            <>
              <li>
                <Link to="/dashboard/assigned-requests">
                  All Blood Donation Requests Manage
                </Link>
              </li>
              <li>
                <Link to="/dashboard/Volunteer-home">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/support-blogs">Support Blogs</Link>
              </li>
            </>
          )}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
