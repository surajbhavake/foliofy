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
          <NavLink to="/dashboard/experiences" className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
            <FiBriefcase className="mr-2" /> Experience
          </NavLink>
          <NavLink to="/dashboard/messages" className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'}`}>
            <FiMail className="mr-2" /> Messages
            {/* Optional: show unread count badge */}
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



// import { useState } from 'react'
// import { Outlet, NavLink } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'

// /* ----------------------------------------------------------------- *
//  * Icons
//  * ----------------------------------------------------------------- */

// const iconProps = {
//   viewBox: '0 0 24 24',
//   fill: 'none',
//   stroke: 'currentColor',
//   strokeWidth: 1.5,
//   strokeLinecap: 'round',
//   strokeLinejoin: 'round',
// }

// const IconHome = (props) => (
//   <svg {...iconProps} className={props.className} aria-hidden="true">
//     <path d="M4 11.5 12 4l8 7.5" />
//     <path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" />
//   </svg>
// )

// const IconUser = (props) => (
//   <svg {...iconProps} className={props.className} aria-hidden="true">
//     <circle cx="12" cy="8" r="3.5" />
//     <path d="M5 20c1-3.5 4-5.5 7-5.5s6 2 7 5.5" />
//   </svg>
// )

// const IconFolder = (props) => (
//   <svg {...iconProps} className={props.className} aria-hidden="true">
//     <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h3.6l1.6 2H18.5A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5Z" />
//   </svg>
// )

// const IconAward = (props) => (
//   <svg {...iconProps} className={props.className} aria-hidden="true">
//     <circle cx="12" cy="9" r="4.5" />
//     <path d="M9 12.5 8 20l4-2 4 2-1-7.5" />
//   </svg>
// )

// const IconBook = (props) => (
//   <svg {...iconProps} className={props.className} aria-hidden="true">
//     <path d="M5 5.5A1.5 1.5 0 0 1 6.5 4H12v16H6.5A1.5 1.5 0 0 1 5 18.5Z" />
//     <path d="M12 4h5.5A1.5 1.5 0 0 1 19 5.5v13a1.5 1.5 0 0 1-1.5 1.5H12" />
//   </svg>
// )

// const IconLogout = (props) => (
//   <svg {...iconProps} className={props.className} aria-hidden="true">
//     <path d="M9 4H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3" />
//     <path d="M13 8l4 4-4 4" />
//     <path d="M17 12H9" />
//   </svg>
// )

// const IconMenu = (props) => (
//   <svg {...iconProps} className={props.className} aria-hidden="true">
//     <path d="M4 7h16" />
//     <path d="M4 12h16" />
//     <path d="M4 17h16" />
//   </svg>
// )

// const IconClose = (props) => (
//   <svg {...iconProps} className={props.className} aria-hidden="true">
//     <path d="M6 6l12 12" />
//     <path d="M18 6 6 18" />
//   </svg>
// )

// /* ----------------------------------------------------------------- *
//  * Nav data
//  * ----------------------------------------------------------------- */

// const navItems = [
//   { to: '/dashboard', end: true, label: 'Dashboard', icon: IconHome },
//   { to: '/dashboard/profile', label: 'Profile', icon: IconUser },
//   { to: '/dashboard/projects', label: 'Projects', icon: IconFolder },
//   { to: '/dashboard/skills', label: 'Skills', icon: IconAward },
//   { to: '/dashboard/blog', label: 'Blog', icon: IconBook },
// ]

// function initialsOf(name = '') {
//   return name
//     .trim()
//     .split(/\s+/)
//     .slice(0, 2)
//     .map((w) => w[0]?.toUpperCase())
//     .join('') || 'U'
// }

// function navLinkClass({ isActive }) {
//   return `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200 ${
//     isActive ? 'bg-amber-400/10 text-amber-300' : 'text-white/50 hover:bg-white/[0.05] hover:text-white'
//   }`
// }

// function SidebarContent({ user, logout, onNavigate }) {
//   return (
//     <>
//       <div className="flex items-center gap-2.5 px-5 py-5">
//         <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 font-mono text-sm font-bold text-zinc-950">
//           F
//         </div>
//         <span className="text-lg font-semibold tracking-tight text-white">Foliofy</span>
//       </div>

//       <nav className="flex-1 space-y-1 px-3">
//         {navItems.map(({ to, end, label, icon: Icon }) => (
//           <NavLink key={to} to={to} end={end} onClick={onNavigate} className={navLinkClass}>
//             {({ isActive }) => (
//               <>
//                 {isActive && <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-amber-400" />}
//                 <Icon className="h-4.5 w-4.5 shrink-0" />
//                 {label}
//               </>
//             )}
//           </NavLink>
//         ))}
//       </nav>

//       <div className="border-t border-white/[0.08] p-3">
//         <div className="flex items-center gap-3 rounded-xl px-2 py-2">
//           <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] font-mono text-xs font-medium text-white/70">
//             {initialsOf(user?.full_name)}
//           </div>
//           <div className="min-w-0 flex-1">
//             <p className="truncate text-sm font-medium text-white">{user?.full_name || 'Account'}</p>
//           </div>
//         </div>
//         <button
//           onClick={logout}
//           className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/50 transition-colors duration-200 hover:bg-rose-500/10 hover:text-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40"
//         >
//           <IconLogout className="h-4.5 w-4.5 shrink-0" />
//           Logout
//         </button>
//       </div>
//     </>
//   )
// }

// /* ----------------------------------------------------------------- *
//  * Layout
//  * ----------------------------------------------------------------- */

// const DashboardLayout = () => {
//   const { user, logout } = useAuth()
//   const [mobileOpen, setMobileOpen] = useState(false)

//   return (
//     <div className="flex h-screen bg-zinc-900">
//       {/* Desktop sidebar */}
//       <aside className="hidden w-64 shrink-0 flex-col border-r border-white/[0.08] bg-zinc-950 lg:flex">
//         <SidebarContent user={user} logout={logout} />
//       </aside>

//       {/* Mobile sidebar */}
//       {mobileOpen && (
//         <div className="fixed inset-0 z-50 flex lg:hidden">
//           <div
//             aria-hidden="true"
//             className="absolute inset-0 bg-black/70 backdrop-blur-sm"
//             onClick={() => setMobileOpen(false)}
//           />
//           <aside className="relative flex w-64 flex-col border-r border-white/[0.08] bg-zinc-950">
//             <button
//               onClick={() => setMobileOpen(false)}
//               aria-label="Close menu"
//               className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:text-white"
//             >
//               <IconClose className="h-4 w-4" />
//             </button>
//             <SidebarContent user={user} logout={logout} onNavigate={() => setMobileOpen(false)} />
//           </aside>
//         </div>
//       )}

//       {/* Main content */}
//       <div className="flex flex-1 flex-col overflow-hidden">
//         <header className="flex items-center gap-3 border-b border-white/[0.08] bg-zinc-950/60 px-4 py-3 backdrop-blur-sm lg:hidden">
//           <button
//             onClick={() => setMobileOpen(true)}
//             aria-label="Open menu"
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 hover:text-white"
//           >
//             <IconMenu className="h-5 w-5" />
//           </button>
//           <span className="text-sm font-semibold text-white">Foliofy</span>
//         </header>

//         <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   )
// }

// export default DashboardLayout