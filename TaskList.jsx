import React, { useState } from 'react';
import TaskItem from './TaskItem.jsx';
import { Filter } from 'lucide-react';

const TaskList = ({ tasks = [], onStatusChange, onDelete }) => {
  const [filter, setFilter] = useState('pending');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase tracking-wider">
          <Filter className="h-3.5 w-3.5" />
          Filter Tasks
        </div>
        <div className="flex gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-900">
          {['pending', 'completed', 'all'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 text-xs rounded-md font-medium smooth-transition uppercase tracking-wider cursor-pointer ${
                filter === tab
                  ? 'bg-slate-800 text-slate-200 border border-slate-700/60'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm border border-slate-900 border-dashed rounded-xl">
            No {filter} tasks.
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
