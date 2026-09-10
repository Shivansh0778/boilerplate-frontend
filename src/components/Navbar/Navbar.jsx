import { UserCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../../store/authSlice";

function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(logout());

    navigate("/login");
  };

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-4 sm:px-6">
      <div className="flex h-full items-center justify-between">
        <Link
          to={
            !isAuthenticated
              ? "/"
              : user?.role === "admin"
                ? "/dashboard"
                : "/user-dashboard"
          }
          className="text-lg font-semibold text-gray-800"
        >
          VIS Boilerplate
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <UserCircle size={32} className="text-gray-600" />

            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-800">
                {user?.firstName} {user?.lastName}
              </p>

              <p className="text-xs capitalize text-gray-500">{user?.role}</p>
            </div>

            <button
              onClick={handleLogout}
              className="ml-1 text-sm text-gray-600 transition hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
