import { useState } from 'react';
import { 
  CreditCard, 
  Bell, 
  Bookmark, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { cn } from '../../utils/cn';

const ReaderDashboard = () => {
  const stats = [
    { label: 'Total Payments', value: '₹4,990', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Membership', value: 'Active', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Dues', value: '₹0', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Saved Articles', value: '12', icon: Bookmark, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const recentNotifications = [
    { id: 1, title: 'Payment Successful', message: 'Your payment for "Quantum Computing" has been processed.', time: '2 hours ago', type: 'success', read: false },
    { id: 2, title: 'New Article Published', message: 'A new article in Topology is now available.', time: '5 hours ago', type: 'info', read: true },
    { id: 3, title: 'Renewal Reminder', message: 'Your annual membership expires in 15 days.', time: '1 day ago', type: 'warning', read: true },
  ];

  const recentSaved = [
    { id: 'ART-001', title: 'On the Homotopy Type of Certain Spaces', tag: 'Topology', date: 'Oct 12, 2023' },
    { id: 'ART-002', title: 'Prime Distribution in Arithmetic Progressions', tag: 'Number Theory', date: 'Sep 25, 2023' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-black tracking-tight font-['Outfit']">Reader Overview</h1>
        <p className="text-zinc-500 mt-1">Welcome back. Here is what's happening with your account.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-zinc-200 p-6 rounded-2xl group hover:border-black transition-all shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon className={stat.color} size={20} />
              </div>
              <TrendingUp className="text-zinc-100" size={16} />
            </div>
            <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-bold text-black mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Notifications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-black font-['Outfit']">Recent Notifications</h2>
            <button className="text-xs font-bold text-black hover:underline uppercase tracking-widest flex items-center gap-2">
              View All <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y divide-zinc-100">
              {recentNotifications.map((notif) => (
                <div key={notif.id} className={cn(
                  "p-6 flex items-start gap-4 hover:bg-zinc-50 transition-colors relative",
                  !notif.read && "after:absolute after:left-0 after:top-0 after:bottom-0 after:w-1 after:bg-black"
                )}>
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                    notif.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                    notif.type === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                  )}>
                    <Bell size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-black">{notif.title}</h4>
                      <span className="text-[10px] text-zinc-400 font-bold">{notif.time}</span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{notif.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Saved Articles Shortcut */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-black font-['Outfit']">Saved Articles</h2>
            <button className="text-xs font-bold text-black hover:underline uppercase tracking-widest flex items-center gap-2">
              Explore <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-4">
            {recentSaved.map((art) => (
              <div key={art.id} className="bg-white border border-zinc-200 p-5 rounded-2xl hover:border-black transition-all group shadow-sm">
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em]">{art.tag}</span>
                <h4 className="text-sm font-bold text-black mt-1 group-hover:text-blue-600 transition-colors line-clamp-1">{art.title}</h4>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-[10px] text-zinc-400 font-medium">{art.date}</span>
                  <button className="p-2 bg-zinc-50 text-black rounded-lg hover:bg-black hover:text-white transition-all">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            ))}
            
            <button className="w-full py-4 border border-dashed border-zinc-200 rounded-2xl text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:border-zinc-400 hover:text-zinc-600 transition-all">
              Go to Saved Articles List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReaderDashboard;
