import { LayoutDashboard, Menu, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, onToggle }) {
  return (
    <div
      className={`border-r border-gray-200 bg-white p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex justify-end">
        <button
          onClick={onToggle}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="mt-6 space-y-2">
        <NavLink
          to="/dashboard"
          title={!isOpen ? "Dashboard" : ""}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 text-sm ${
              isActive
                ? "bg-gray-100 font-medium text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <LayoutDashboard size={20} />

          {isOpen && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/users"
          title={!isOpen ? "Users" : ""}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-4 py-3 text-sm ${
              isActive
                ? "bg-gray-100 font-medium text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <Users size={20} />

          {isOpen && <span>Users</span>}
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
