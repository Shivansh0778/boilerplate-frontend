import { useSelector } from "react-redux";
import { LockKeyhole } from "lucide-react";

function UserDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-5xl">
        
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome back, {user?.firstName}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your account and view your profile information.
          </p>
        </div>

        <div className="space-y-6">
        
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">
              Account Status
            </h2>

            <div className="mt-5 flex items-center gap-3">
              <span
                className={`h-3 w-3 rounded-full ${
                  user?.isActive ? "bg-green-500" : "bg-red-500"
                }`}
              />

              <span className="text-sm font-medium text-gray-700">
                {user?.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">
              Profile Information
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">First Name</p>
                <p className="mt-1 text-sm font-medium text-gray-800">
                  {user?.firstName || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Last Name</p>
                <p className="mt-1 text-sm font-medium text-gray-800">
                  {user?.lastName || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="mt-1 break-words text-sm font-medium text-gray-800">
                  {user?.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="mt-1 text-sm font-medium text-gray-800">
                  {user?.dob ? new Date(user.dob).toLocaleDateString() : "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">
              Account Actions
            </h2>

            <button
              type="button"
              className="mt-5 flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <LockKeyhole size={17} />
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
