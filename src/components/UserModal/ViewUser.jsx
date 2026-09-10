function ViewUser({ user, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900"
          >
            ✕
          </button>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs text-gray-500">First Name</p>
            <p className="text-sm font-medium text-gray-800">
              {user.firstName}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Last Name</p>
            <p className="text-sm font-medium text-gray-800">{user.lastName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-sm font-medium text-gray-800">{user.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Date of Birth</p>
            <p className="text-sm font-medium text-gray-800">
              {user.dob
                ? new Date(user.dob).toLocaleDateString()
                : "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Role</p>
            <p className="text-sm font-medium text-gray-800">{user.role}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Status</p>
            <p className="text-sm font-medium text-gray-800">
              {user.isActive === false ? "Inactive" : "Active"}
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
export default ViewUser;
