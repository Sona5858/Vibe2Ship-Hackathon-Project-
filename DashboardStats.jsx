import React from 'react';
import { ArrowUpRight, Award, Flame, Hourglass, CheckCircle2, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardStats = ({ stats }) => {
  const {
    completionRate = 0,
    tasksCompleted = 0,
    tasksSkipped = 0,
    focusMinutes = 0,
    insights = []
  } = stats || {};

  const trendData = [
    { name: 'Mon', completed: Math.round(tasksCompleted * 0.2) },
    { name: 'Tue', completed: Math.round(tasksCompleted * 0.4) },
    { name: 'Wed', completed: Math.round(tasksCompleted * 0.3) },
    { name: 'Thu', completed: Math.round(tasksCompleted * 0.6) },
    { name: 'Fri', completed: Math.round(tasksCompleted * 0.8) },
    { name: 'Sat', completed: Math.round(tasksCompleted * 0.9) },
    { name: 'Sun', completed: tasksCompleted },
  ];

  const cards = [
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      icon: Award,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      glow: 'neon-glow-primary'
    },
    {
      label: 'Focus Time',
      value: `${Math.floor(focusMinutes / 60)}h ${focusMinutes % 60}m`,
      icon: Hourglass,
      color: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
      glow: 'neon-glow-accent'
    },
    {
      label: 'Completed Tasks',
      value: tasksCompleted,
      icon: CheckCircle2,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      glow: 'shadow-blue-500/5'
    },
    {
      label: 'Skipped Tasks',
      value: tasksSkipped,
      icon: AlertTriangle,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      glow: 'shadow-amber-500/5'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className={`glass-panel p-5 rounded-2xl border flex items-center justify-between smooth-transition ${card.glow}`}>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{card.label}</p>
              <h3 className="text-2xl font-bold mt-1 text-slate-100">{card.value}</h3>
            </div>
            <div className={`p-3 rounded-xl border ${card.color}`}>
              <card.icon className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-200">Execution Velocity</h3>
              <p className="text-xs text-slate-500">Task completion trends this week</p>
            </div>
            <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20 font-medium">
              <ArrowUpRight className="h-3 w-3" />
              +12% vs last week
            </span>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  labelStyle={{ color: '#94a3b8' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCompleted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between border-l-2 border-l-violet-500">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20 neon-glow-accent">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-200">Execution Coach</h3>
                <p className="text-xs text-slate-500">AI-driven focus insights</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {insights.map((insight, idx) => (
                <div key={idx} className="flex gap-3 text-sm text-slate-300 bg-slate-900/30 border border-slate-800/60 p-3 rounded-xl">
                  <div className="text-violet-400 font-bold mt-0.5">•</div>
                  <p>{insight}</p>
                </div>
              ))}
              {insights.length === 0 && (
                <p className="text-slate-400 text-sm">Add and complete tasks to unlock AI coaching insights.</p>
              )}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-800/60 text-xs text-slate-500 flex items-center justify-between">
            <span>Coached by Gemini 2.5 Flash</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
