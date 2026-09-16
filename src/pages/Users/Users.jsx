import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import AdminLayout from "../../components/AdminLayout/AdminLayout";
import {
  getUsers,
  updateUserStatus,
  deleteUser,
  updateUser,
} from "../../services/user.service";
import ViewUser from "../../components/UserModal/ViewUser";
import EditUser from "../../components/UserModal/EditUser";
import DeleteUser from "../../components/UserModal/DeleteUser";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data.users);
      } catch (error) {
        console.error("Failed to fetch users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusChange = async (user) => {
    try {
      const newStatus = user.isActive === false;

      await updateUserStatus(user._id, newStatus);

      setUsers((currentUsers) =>
        currentUsers.map((currentUser) =>
          currentUser._id === user._id
            ? { ...currentUser, isActive: newStatus }
            : currentUser,
        ),
      );
    } catch (error) {
      console.error("Failed to update user status:", error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUser._id);

      setUsers((currentUsers) =>
        currentUsers.filter(
          (currentUser) => currentUser._id !== selectedUser._id,
        ),
      );

      setSelectedUser(null);
      setModalType(null);
    } catch (error) {
      console.error("Failed to delete user:", error.message);
    }
  };

  const handleEditUser = async (updatedData) => {
    try {
      const data = await updateUser(selectedUser._id, updatedData);

      setUsers((currentUsers) =>
        currentUsers.map((currentUser) =>
          currentUser._id === selectedUser._id
            ? {
                ...currentUser,
                ...data.user,
                _id: currentUser._id,
              }
            : currentUser,
        ),
      );

      setSelectedUser(null);
      setModalType(null);
    } catch (error) {
      console.error("Failed to update user:", error.message);
    }
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Users</h1>

        <p className="mt-2 text-sm text-gray-500">Manage registered users.</p>

        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-medium text-gray-600">
                    Name
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-600">
                    Email
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-600">
                    Actions
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-100">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {user.firstName} {user.lastName}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setModalType("view");
                          }}
                          title="View user"
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setModalType("edit");
                          }}
                          title="Edit user"
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setModalType("delete");
                          }}
                          title="Delete user"
                          className="text-gray-500 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(user)}
                        className={`relative h-6 w-11 rounded-full transition ${
                          user.isActive === false
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-200 ${
                            user.isActive === false ? "left-1" : "left-6"
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedUser && modalType === "view" && (
          <ViewUser
            user={selectedUser}
            onClose={() => {
              setSelectedUser(null);
              setModalType(null);
            }}
          />
        )}

        {selectedUser && modalType === "edit" && (
          <EditUser
            user={selectedUser}
            onClose={() => {
              setSelectedUser(null);
              setModalType(null);
            }}
            onSave={handleEditUser}
          />
        )}

        {selectedUser && modalType === "delete" && (
          <DeleteUser
            user={selectedUser}
            onClose={() => {
              setSelectedUser(null);
              setModalType(null);
            }}
            onDelete={handleDeleteUser}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default Users;