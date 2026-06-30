import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, CalendarCheck, Clock, Sparkles } from 'lucide-react';

const ScheduleTimeline = ({ schedule, onStatusUpdate, onReplan, onCalendarSync }) => {
  const [syncing, setSyncing] = useState(false);
  const [replanning, setReplanning] = useState(false);

  const { timeBlocks = [], reasoning = '', calendarSynced = false } = schedule || {};

  const handleSync = async () => {
    setSyncing(true);
    try {
      await onCalendarSync();
    } finally {
      setSyncing(false);
    }
  };

  const handleReplan = async () => {
    setReplanning(true);
    try {
      await onReplan();
    } finally {
      setReplanning(false);
    }
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case 'focus':
        return 'border-l-4 border-l-emerald-500 bg-emerald-500/5 text-emerald-300';
      case 'break':
        return 'border-l-4 border-l-cyan-500 bg-cyan-500/5 text-cyan-300';
      case 'buffer':
        return 'border-l-4 border-l-amber-500 bg-amber-500/5 text-amber-300';
      default:
        return 'border-l-4 border-l-slate-600 bg-slate-800/10 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 rounded-2xl">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-emerald-400" />
          <h3 className="text-base font-bold text-slate-100">Daily Timeline</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReplan}
            disabled={replanning || timeBlocks.length === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 disabled:text-slate-600 text-slate-300 rounded-lg text-xs font-semibold border border-slate-700 smooth-transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${replanning ? 'animate-spin' : ''}`} />
            Replan remaining day
          </button>
          
          <button
            onClick={handleSync}
            disabled={syncing || timeBlocks.length === 0}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold smooth-transition ${
              calendarSynced 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950 border border-transparent'
            }`}
          >
            <CalendarCheck className="h-3.5 w-3.5" />
            {calendarSynced ? 'Synced to Calendar' : 'Sync to Calendar'}
          </button>
        </div>
      </div>

      {reasoning && (
        <div className="glass-panel p-4 rounded-xl border border-slate-800/60 bg-gradient-to-r from-violet-950/10 to-transparent">
          <div className="flex gap-2 items-center text-xs text-violet-400 font-bold uppercase tracking-wider mb-1">
            <Sparkles className="h-3.5 w-3.5" />
            AI Execution Strategy
          </div>
          <p className="text-sm text-slate-300">{reasoning}</p>
        </div>
      )}

      <div className="relative border-l-2 border-slate-800 pl-6 ml-3 space-y-6 py-2">
        {timeBlocks.map((block) => (
          <div key={block.id} className="relative group">
            <div className={`absolute -left-[33px] top-4 h-4.5 w-4.5 rounded-full border-2 bg-slate-950 transition-colors ${
              block.status === 'completed'
                ? 'border-emerald-500 bg-emerald-950'
                : block.status === 'skipped'
                ? 'border-red-500 bg-red-950'
                : 'border-slate-800'
            }`} />

            <div className={`glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-4 smooth-transition ${
              block.status === 'completed' 
                ? 'opacity-60 border-slate-900 bg-slate-900/10' 
                : block.status === 'skipped' 
                ? 'opacity-60 border-slate-900 bg-slate-900/10 line-through' 
                : 'hover:border-slate-700'
            } ${getTypeStyle(block.type)}`}>
              <div>
                <span className="text-xs text-slate-500 font-mono tracking-wider">
                  {block.startTime} - {block.endTime}
                </span>
                <h4 className="text-sm font-bold text-slate-100 mt-0.5">{block.title}</h4>
              </div>

              {block.status === 'pending' && (
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => onStatusUpdate(block.id, 'completed', block.taskId)}
                    className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 rounded-lg border border-emerald-500/20 smooth-transition"
                    title="Mark Completed"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onStatusUpdate(block.id, 'skipped', block.taskId)}
                    className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-slate-950 rounded-lg border border-red-500/20 smooth-transition"
                    title="Skip Block"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              )}

              {block.status === 'completed' && (
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 shrink-0">
                  Completed
                </span>
              )}

              {block.status === 'skipped' && (
                <span className="text-xs font-semibold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20 shrink-0">
                  Skipped
                </span>
              )}
            </div>
          </div>
        ))}

        {timeBlocks.length === 0 && (
          <div className="text-center py-12 text-slate-500 border border-slate-900 border-dashed rounded-xl">
            No schedule generated. Trigger planning to outline your day!
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleTimeline;
