import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { LayoutDashboard, CheckSquare, Calendar, Settings, LogOut, Zap } from 'lucide-react';

const Navigation = () => {
  const { userData, logout } = useAuth();
  
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/tasks', label: 'Tasks', icon: CheckSquare },
    { to: '/schedule', label: 'Schedule', icon: Calendar },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];
  
  return (
    <nav className="fixed top-0 left-0 h-screen w-64 glass-panel border-r border-slate-800 flex flex-col justify-between py-6 px-4 z-40">
      <div>
        <div className="flex items-center gap-3 px-3 py-2 mb-8">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 neon-glow-primary">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-slate-100">
              Deadline<span className="text-emerald-400">OS</span>
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">AI Execution Agent</p>
          </div>
        </div>
        
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl smooth-transition font-medium text-sm group ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/15 to-violet-500/5 text-emerald-400 border-l-2 border-emerald-400'
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                }`
              }
            >
              <item.icon className="h-5 w-5 group-hover:scale-105 transition-transform" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        {userData && (
          <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <img
              src={userData.photoURL || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${userData.email}`}
              alt="Profile"
              className="h-10 w-10 rounded-full border border-slate-700 object-cover"
            />
            <div className="overflow-hidden">
              <h2 className="text-sm font-semibold text-slate-200 truncate">{userData.displayName || 'Executioner'}</h2>
              <p className="text-[11px] text-slate-500 truncate">{userData.email}</p>
            </div>
          </div>
        )}
        
        <button
          onClick={logout}
          className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 smooth-transition font-medium text-sm"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
