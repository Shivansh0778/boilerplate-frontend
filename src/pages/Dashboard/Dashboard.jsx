import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AdminLayout from "../../components/AdminLayout/AdminLayout";
import { getUserStats } from "../../services/user.service";

function Dashboard() {
  const token = useSelector((state) => state.auth.token);

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getUserStats(token);

        setStats(data.stats);
      } catch (error) {
        console.error("Failed to fetch stats:", error.message);
      }
    };

    if (token) {
      fetchStats();
    }
  }, [token]);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>

        <p className="mt-2 text-sm text-gray-500">Overview of your users.</p>

        <div className="mt-8 flex flex-col gap-6 md:flex-row">
          <Link
            to="/users?status=all"
            className="flex-1 rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <p className="text-sm font-medium text-gray-500">Total Users</p>

            <h2 className="mt-3 text-3xl font-semibold text-gray-800">
              {stats.totalUsers}
            </h2>

            <p className="mt-2 text-sm text-gray-500">View all users</p>
          </Link>

          <Link
            to="/users?status=active"
            className="flex-1 rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <p className="text-sm font-medium text-gray-500">Active Users</p>

            <h2 className="mt-3 text-3xl font-semibold text-gray-800">
              {stats.activeUsers}
            </h2>

            <p className="mt-2 text-sm text-gray-500">View active users</p>
          </Link>

          <Link
            to="/users?status=inactive"
            className="flex-1 rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <p className="text-sm font-medium text-gray-500">Inactive Users</p>

            <h2 className="mt-3 text-3xl font-semibold text-gray-800">
              {stats.inactiveUsers}
            </h2>

            <p className="mt-2 text-sm text-gray-500">View inactive users</p>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
