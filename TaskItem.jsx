import React, { useState } from 'react';
import { Calendar, Clock, ChevronDown, ChevronUp, Trash2, CheckCircle, HelpCircle } from 'lucide-react';

const TaskItem = ({ task, onStatusChange, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-red-400 bg-red-500/10 border-red-500/30';
    if (score >= 40) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'No deadline';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`glass-panel p-4 rounded-xl border border-slate-800 smooth-transition ${
      task.status === 'completed' 
        ? 'opacity-50 border-slate-900 bg-slate-900/10' 
        : 'hover:border-slate-700'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          {task.status === 'pending' && (
            <button
              onClick={() => onStatusChange(task.id, 'completed')}
              className="mt-1 h-5 w-5 rounded-full border border-slate-700 hover:border-emerald-500 flex items-center justify-center hover:bg-emerald-500/10 text-transparent hover:text-emerald-400 cursor-pointer smooth-transition shrink-0"
            >
              <CheckCircle className="h-3 w-3" />
            </button>
          )}
          
          <div className="min-w-0">
            <h4 className={`text-sm font-bold text-slate-100 truncate ${task.status === 'completed' ? 'line-through text-slate-500' : ''}`}>
              {task.title}
            </h4>
            {task.description && (
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{task.description}</p>
            )}
            
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                <Calendar className="h-3 w-3" />
                {formatDate(task.deadline)}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                <Clock className="h-3 w-3" />
                {task.estimatedDuration} min
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold bg-slate-900/50 px-2 py-0.5 rounded border border-slate-800">
                {task.source}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className={`flex flex-col items-center px-2 py-1 rounded-lg border text-center font-mono ${getScoreColor(task.priorityScore)}`}>
            <span className="text-[9px] uppercase tracking-wider font-sans font-bold">Score</span>
            <span className="text-sm font-bold">{task.priorityScore}</span>
          </div>

          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 bg-slate-900 border border-slate-800 hover:border-red-500/30 text-slate-500 hover:text-red-400 rounded-lg smooth-transition cursor-pointer"
            title="Delete Task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {task.priorityExplanation && (
        <div className="mt-3 pt-3 border-t border-slate-900">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[11px] text-violet-400 hover:text-violet-300 font-bold uppercase tracking-wider cursor-pointer"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            AI Priority Reasoning
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
          
          {expanded && (
            <p className="text-xs text-slate-300 mt-2 bg-violet-950/5 border border-violet-900/10 p-2.5 rounded-lg italic">
              {task.priorityExplanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
