import { useState } from "react";

import Sidebar from "../Sidebar/Sidebar";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
        />

        <main className="min-h-[calc(100vh-64px)] flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;