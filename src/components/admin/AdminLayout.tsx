import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Globe, 
  Zap, 
  Briefcase, 
  Package, 
  Image as ImageIcon, 
  ClipboardList, 
  Users, 
  Settings,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/src/lib/AuthContext";

const modules = [
  { name: "Overview", icon: LayoutDashboard, path: "/admin" },
  { name: "CMS Engine", icon: FileText, path: "/admin/cms" },
  { name: "Domain Control", icon: Globe, path: "/admin/domains" },
  { name: "Solutions", icon: Zap, path: "/admin/solutions" },
  { name: "Projects", icon: Briefcase, path: "/admin/projects" },
  { name: "Products", icon: Package, path: "/admin/products" },
  { name: "CRM / Leads", icon: ClipboardList, path: "/admin/leads" },
  { name: "Asset Manager", icon: ImageIcon, path: "/admin/media" },
  { name: "User Roles", icon: Users, path: "/admin/users" },
  { name: "System Settings", icon: Settings, path: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-light-gray overflow-hidden font-sans">
      {/* ── SIDEBAR ── */}
      <aside className={`bg-brand-black text-pure-white transition-all duration-500 ease-in-out flex flex-col z-50 ${isSidebarOpen ? "w-72" : "w-20"}`}>
        <div className="p-8 flex items-center justify-between border-b border-white/5 h-24">
          <Link to="/" className={`font-display font-bold text-xl tracking-wider overflow-hidden whitespace-nowrap transition-all duration-300 ${!isSidebarOpen ? "opacity-0 invisible w-0" : "opacity-100"}`}>
            NX<span className="text-brand-walnut">.Admin</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all shrink-0"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-grow py-8 overflow-y-auto overflow-x-hidden custom-scrollbar">
           <div className={`px-8 mb-4 text-[10px] font-bold text-white/20 uppercase tracking-[.3em] transition-opacity duration-300 ${!isSidebarOpen && "opacity-0"}`}>
              Main Navigation
           </div>
          {modules.map((mod) => {
            const isActive = location.pathname === mod.path || (mod.path !== "/admin" && location.pathname.startsWith(mod.path));
            return (
              <Link
                key={mod.name}
                to={mod.path}
                className={`flex items-center gap-5 px-8 py-4 transition-all group relative ${isActive ? "text-pure-white bg-white/5" : "text-white/40 hover:text-white hover:bg-white/5"}`}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-walnut" />}
                <mod.icon size={20} className={`shrink-0 transition-colors ${isActive ? "text-brand-walnut" : "group-hover:text-amber-400"}`} />
                <span className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 ${!isSidebarOpen ? "opacity-0 invisible -translate-x-4" : "opacity-100 translate-x-0"}`}>{mod.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-white/5">
          <button 
            onClick={logout}
            className="flex items-center gap-5 text-[10px] font-bold uppercase tracking-[.2em] text-red-400/60 hover:text-red-400 transition-all w-full group"
          >
            <LogOut size={20} className="shrink-0" />
            <span className={`transition-all duration-300 ${!isSidebarOpen ? "opacity-0 invisible" : "opacity-100"}`}>Logout System</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-grow flex flex-col min-w-0 relative">
        <header className="h-24 bg-pure-white border-b border-cool-gray/30 flex items-center justify-between px-10 shrink-0 z-40">
           <div className="flex bg-light-cream rounded-2xl px-6 py-3 border border-cool-gray/30 w-full max-w-md group focus-within:border-brand-walnut transition-all">
              <Search size={18} className="text-slate-blue/20 mr-4 group-focus-within:text-brand-walnut transition-colors" />
              <input 
                type="text" 
                placeholder="Search analytics, leads, resources..." 
                className="bg-transparent border-none outline-none text-sm w-full font-medium" 
              />
           </div>
           
           <div className="flex items-center gap-8">
              <div className="hidden lg:flex items-center gap-4">
                 <button className="relative p-2.5 rounded-xl bg-light-gray text-slate-blue/40 hover:text-brand-walnut hover:bg-light-cream transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-pure-white" />
                 </button>
                 <button className="p-2.5 rounded-xl bg-light-gray text-slate-blue/40 hover:text-brand-walnut hover:bg-light-cream transition-all">
                    <Settings size={20} />
                 </button>
              </div>

              <div className="w-px h-10 bg-cool-gray/30" />

              <div className="flex items-center gap-4">
                 <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-slate-blue">{user?.name}</div>
                    <div className="text-[9px] text-slate-blue/40 font-bold uppercase tracking-[.2em] mt-0.5">{user?.role}</div>
                 </div>
                 <div className="w-12 h-12 bg-light-cream border border-brand-walnut/20 rounded-2xl flex items-center justify-center text-brand-walnut font-bold text-lg shadow-sm">
                    {user?.name?.[0]}
                 </div>
              </div>
           </div>
        </header>

        <div className="flex-grow overflow-y-auto p-10 custom-scrollbar relative">
           {/* Subtle background decoration */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-walnut/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
           
           <div className="relative z-10 max-w-7xl mx-auto">
              {children}
           </div>
        </div>
      </main>
    </div>
  );
}
