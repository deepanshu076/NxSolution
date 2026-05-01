import { motion } from "motion/react";
import { 
  ClipboardList, 
  MessageSquare, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText
} from "lucide-react";
import { useAuth } from "@/src/lib/AuthContext";
import { useState } from "react";

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("enquiries");

  const enquiries = [
    { id: "E001", title: "Smart Library System", date: "28 Apr", domain: "Education", status: "In Progress" },
    { id: "E002", title: "OPD Queue Manager", date: "15 Apr", domain: "Healthcare", status: "Closed" },
    { id: "E003", title: "Hotel PMS Demo", date: "10 Apr", domain: "Hospitality", status: "New" },
  ];

  const notifications = [
    { text: "Your enquiry status updated to In Progress", time: "2 hours ago" },
    { text: "Demo scheduled for Smart Library", time: "Yesterday" }
  ];

  return (
    <div className="min-h-screen bg-light-gray pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="bg-pure-white rounded-[2.5rem] border border-cool-gray/30 overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]">
           
           {/* Sidebar Navigation */}
           <aside className="md:w-72 bg-light-cream border-r border-cool-gray/30 flex flex-col">
              <div className="p-8 bg-slate-blue text-pure-white">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-accent-sky font-bold text-lg">
                       {user?.name?.[0]}
                    </div>
                    <div>
                       <div className="text-sm font-bold truncate">{user?.name}</div>
                       <div className="text-[10px] text-pure-white/40 font-bold uppercase tracking-widest leading-none mt-1">Member Access</div>
                    </div>
                 </div>
                 <button onClick={logout} className="text-xs text-pure-white/60 hover:text-red-400 transition-colors flex items-center gap-2">
                    <LogOut size={14} /> Logout
                 </button>
              </div>

              <nav className="flex-grow py-8 px-4 space-y-2">
                 {[
                   { id: "enquiries", label: "My Enquiries", icon: ClipboardList },
                   { id: "quotes", label: "My Quotes", icon: FileText },
                   { id: "demos", label: "Demo Requests", icon: Play },
                   { id: "saved", label: "Saved Projects", icon: Star },
                   { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
                   { id: "profile", label: "Profile", icon: User },
                   { id: "settings", label: "Settings", icon: Settings }
                 ].map((nav) => (
                   <button
                    key={nav.id}
                    onClick={() => setActiveTab(nav.id)}
                    className={`w-full flex items-center justify-between px-6 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === nav.id ? "bg-pure-white text-slate-blue border border-cool-gray/50 shadow-sm" : "text-slate-blue/40 hover:bg-white/50"}`}
                   >
                      <div className="flex items-center gap-4">
                        <nav.icon size={18} className={activeTab === nav.id ? "text-brand-walnut" : ""} />
                        <span>{nav.label}</span>
                      </div>
                      {nav.badge && (
                        <span className="w-5 h-5 bg-red-500 text-pure-white text-[10px] flex items-center justify-center rounded-full">{nav.badge}</span>
                      )}
                   </button>
                 ))}
              </nav>
           </aside>

           {/* Content Area */}
           <main className="flex-1 p-10 md:p-16">
              <div className="flex justify-between items-center mb-12">
                 <h2 className="text-2xl font-display font-bold text-slate-blue">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                 <div className="text-[10px] font-bold text-slate-blue/30 uppercase tracking-widest">Last updated: Today</div>
              </div>

              {activeTab === "enquiries" && (
                <div className="space-y-4">
                   {enquiries.map((req) => (
                     <div key={req.id} className="p-6 bg-light-gray/30 rounded-3xl border border-cool-gray/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-brand-walnut/50 transition-all cursor-pointer group">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-2xl bg-pure-white border border-cool-gray/50 flex items-center justify-center text-brand-walnut group-hover:bg-brand-walnut group-hover:text-pure-white transition-all">
                              <MessageSquare size={20} />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-blue mb-1">{req.title}</h4>
                              <div className="text-[10px] text-slate-blue/40 font-bold uppercase tracking-widest flex items-center gap-2">
                                 <span>{req.date}</span>
                                 <div className="w-1 h-1 bg-cool-gray rounded-full" />
                                 <span>{req.domain}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-8">
                           <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-pure-white border border-cool-gray/50 text-[10px] font-bold text-slate-blue/60 uppercase">
                              <div className={`w-2 h-2 rounded-full ${req.status === "New" ? "bg-blue-500" : req.status === "Closed" ? "bg-green-500" : "bg-orange-500"}`} />
                              {req.status}
                           </div>
                           <ChevronRight size={18} className="text-cool-gray group-hover:text-brand-walnut translate-x-0 group-hover:translate-x-1 transition-all" />
                        </div>
                     </div>
                   ))}

                   <div className="mt-12 pt-12 border-t border-cool-gray/30">
                      <h3 className="text-sm font-bold text-slate-blue/40 uppercase tracking-widest mb-6">Recent Notifications</h3>
                      <div className="space-y-4">
                         {notifications.map((n, i) => (
                           <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-light-cream/50 transition-all">
                              <Bell size={16} className="text-brand-walnut mt-1 shrink-0" />
                              <div>
                                 <p className="text-xs text-slate-blue mb-1 font-medium">{n.text}</p>
                                 <span className="text-[10px] text-slate-blue/30 font-bold uppercase tracking-widest">{n.time}</span>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              )}

              {activeTab !== "enquiries" && (
                <div className="h-64 flex flex-col items-center justify-center text-center">
                   <div className="w-20 h-20 bg-slate-blue/5 rounded-full flex items-center justify-center text-slate-blue/20 mb-6">
                      <AlertCircle size={40} />
                   </div>
                   <h3 className="text-xl font-bold text-slate-blue/40 mb-2">Module is coming soon</h3>
                   <p className="text-slate-blue/20 text-sm">We are currently setting up this dashboard section.</p>
                </div>
              )}
           </main>
        </div>
      </div>
    </div>
  );
}

import { Star, Play } from "lucide-react";
