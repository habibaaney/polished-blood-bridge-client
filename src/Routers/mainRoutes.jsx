import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DonorRoute from "./DonorRoute";
import VolunteerRoute from "./VolunteerRoute";

// Dashboard Pages
import UserProfile from "../pages/dashboard/UserProfile";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageBlogs from "../pages/dashboard/admin/ManageBlogs";
import MyDonationRequests from "../pages/dashboard/donor/MyDonationRequests";
import DonorDashboardHome from "../pages/dashboard/donor/DonorDashboardHome";
import SupportBlogs from "../pages/dashboard/volunteer/SupportBlogs";
import CreateDonationRequest from "../pages/dashboard/donor/CreateDonationRequest";
import EditDonationRequest from "../pages/dashboard/donor/EditDonationRequest";
import DonationRequestDetails from "../pages/dashboard/donor/DonationRequestDetails";
import AdminDashboardHome from "../pages/dashboard/admin/AdminDashboardHome";
import AboutUs from "../components/AboutUs";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";
import ContactUs from "../components/ContactUs";
import VolunteerDashboardHome from "../pages/dashboard/volunteer/VolunteerDashboardHome";
import ManageBloodDonationRequests from "../pages/dashboard/admin/ManageBloodDonationRequests";
import VolunteerDonationRequestsManage from "../pages/dashboard/volunteer/VolunteerDonationRequestsManage";
import ContentManagement from "../pages/dashboard/admin/ContentManagement";
import AddBlog from "../pages/dashboard/admin/AddBlog";
import Blog from "../pages/Blog";
import Search from "../pages/Search/Search";
import DonationRequests from "../pages/DonationRequests";
import FundingsPage from "../pages/FundingsPage";
import ExtraSections from "../components/ExtraSections";
const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Register />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/featureSection",
        element: <FeatureSection />,
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
      },
      {
        path: "/footer",
        element: <Footer />,
      },
      {
        path: "/ExtraSections",
        element: <ExtraSections />,
      },
      {
        path: "/blog-posts",
        element: <Blog />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/donation-request",
        element: <DonationRequests />,
      },
      {
        path: "/donation-request/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          // Common route
          {
            path: "profile",
            element: <UserProfile />,
          },

          {
            path: "create-donation-request",
            element: <CreateDonationRequest />,
          },
          {
            path: "my-requests",
            element: <MyDonationRequests />,
          },
          {
            path: "edit-donation-request/:id",
            element: <EditDonationRequest />,
          },
          {
            path: "donation-request/:id",
            element: <DonationRequestDetails />,
          },
          {
            path: "fundings",
            element: <FundingsPage />,
          },

          // Admin routes

          {
            path: "manage-users",
            element: (
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            ),
          },
          {
            path: "admin-home",
            element: (
              <AdminRoute>
                <AdminDashboardHome />
              </AdminRoute>
            ),
          },
          {
            path: "manage-requests",
            element: (
              <AdminRoute>
                <ManageBloodDonationRequests />
              </AdminRoute>
            ),
          },
          {
            path: "blogs",
            element: (
              <AdminRoute>
                <ContentManagement />
              </AdminRoute>
            ),
          },
          {
            path: "add-blogs",
            element: <AddBlog />,
          },

          // Donor routes

          {
            path: "donor-home",
            element: (
              <DonorRoute>
                <DonorDashboardHome />
              </DonorRoute>
            ),
          },
          // {
          //   path: "edit-donation-request/:id",
          //   element: <EditDonationRequest />,
          // },
          // {
          //   path: "donation-request/:id",
          //   element: <DonationRequestDetails />,
          // },

          // Volunteer routes
          {
            path: "volunteer-home",
            element: (
              <VolunteerRoute>
                <VolunteerDashboardHome />
              </VolunteerRoute>
            ),
          },
          {
            path: "assigned-requests",
            element: (
              <VolunteerRoute>
                <VolunteerDonationRequestsManage />
              </VolunteerRoute>
            ),
          },
          {
            path: "support-blogs",
            element: (
              <VolunteerRoute>
                <SupportBlogs />
              </VolunteerRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default mainRoutes;
