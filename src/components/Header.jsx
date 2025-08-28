import { useContext, useState } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenuAddLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useUserRole from "../hooks/useUserRole";
import Loading from "../pages/Loading";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  // console.log(user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { role, isLoading } = useUserRole();
  // console.log(role);

  if (isLoading) return <Loading />;

  // Generate dashboard path based on role
  const dashboardPath =
    user?.role === "admin"
      ? "/dashboard/admin-home"
      : user?.role === "volunteer"
      ? "/dashboard/volunteer-home"
      : user?.role === "donor" && "/dashboard";

  const menu = [
    {
      name: "Dashboard",
      path: dashboardPath,
    },
    {
      name: "About Us",
      path: "/about",
    },
    {
      name: "Donation-request",
      path: "/donation-request",
    },
  ];

  return (
    <nav className="overflow-x-clip bg-red-100 bg-opacity-30 backdrop-blur-md shadow-md sticky top-0 z-50">
      {user && (
        <p className="text-center text-white bg-black py-2 bg-opacity-90">
          Welcome Mr. {user?.displayName} ❤️🩸. Now You Can Access All Features.
        </p>
      )}
      <div className="w-11/12 mx-auto py-5 flex justify-between items-center relative">
        <Link to="/" className="logo">
          <span className="text-xl font-bold text-stone-700">
            Blood🩸Bridge
          </span>
        </Link>

        {/* Large screen menu */}
        <ul className="hidden lg:flex items-center gap-5">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "font-bold text-red-600" : "hover:text-red-600"
              }
            >
              {item.name}
            </NavLink>
          ))}
          {user?.email ? (
            <>
              {/* <NavLink to="/donation-request">donation-request</NavLink> */}
              <NavLink to="/search">Search</NavLink>
              <NavLink to="/blog-posts">Blog Posts</NavLink>
              <button onClick={logOut} className="cursor-pointer">
                Logout
              </button>
            </>
          ) : (
            <>
              {/* <NavLink to="/donation-request">Donation-request</NavLink> */}
              <NavLink to="/search">Search</NavLink>
              <NavLink to="/blog-posts">Blogs</NavLink>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/registration">Register</NavLink>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          {!isMenuOpen ? (
            <RiMenuAddLine
              onClick={() => setIsMenuOpen(true)}
              className="text-2xl cursor-pointer"
            />
          ) : (
            <CgMenuMotion
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl cursor-pointer"
            />
          )}

          {/* Mobile menu list */}
          <ul
            className={`flex flex-col lg:hidden gap-5 absolute z-50 bg-white bg-opacity-90 w-full top-14 left-0 p-4 transition-all duration-300 ${
              isMenuOpen ? "animate__animated animate__fadeInRight" : "hidden"
            }`}
          >
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="border-b-2 hover:border-red-500 transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            {user?.email ? (
              <button onClick={logOut} className="cursor-pointer">
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/registration">Register</NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
