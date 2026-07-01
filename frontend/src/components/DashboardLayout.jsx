import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiUser, FiFolder, FiAward, FiBookOpen, FiLogOut } from 'react-icons/fi';

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-5 text-2xl font-bold border-b">Foliofy</div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/dashboard" end className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
            <FiHome className="mr-2" /> Dashboard
          </NavLink>
          <NavLink to="/dashboard/profile" className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
            <FiUser className="mr-2" /> Profile
          </NavLink>
          <NavLink to="/dashboard/projects" className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
            <FiFolder className="mr-2" /> Projects
          </NavLink>
          <NavLink to="/dashboard/skills" className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
            <FiAward className="mr-2" /> Skills
          </NavLink>
          <NavLink to="/dashboard/blog" className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
            <FiBookOpen className="mr-2" /> Blog
          </NavLink>
        </nav>
        <div className="p-4 border-t">
          <div className="text-sm text-gray-500">{user?.full_name}</div>
          <button onClick={logout} className="flex items-center mt-2 text-red-500 hover:text-red-700">
            <FiLogOut className="mr-1" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;