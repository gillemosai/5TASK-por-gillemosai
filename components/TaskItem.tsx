import React, { useState } from 'react';
import { Trash2, Check, AlertTriangle, Edit2, X, Save } from 'lucide-react';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  // Check for 24 hours pending (86400000 ms)
  const isStale = !task.completed && (Date.now() - task.createdAt > 86400000);

  const handleSave = () => {
    if (editedText.trim()) {
      onEdit(task.id, editedText);
      setIsEditing(false);
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`relative group mb-3 rounded-xl border border-slate-700 bg-slate-900/50 p-4 transition-all duration-300 hover:border-neon-purple hover:shadow-[0_0_15px_rgba(94,23,235,0.15)] shadow-md ${task.completed ? 'opacity-60 grayscale' : ''}`}>
      
      {/* 24h Alert Banner */}
      {isStale && !isEditing && (
        <div className="absolute -top-2 left-4 px-2 py-0.5 bg-red-500 text-white text-[10px] uppercase font-bold tracking-wider rounded-full flex items-center gap-1 shadow-lg z-20 animate-pulse">
          <AlertTriangle size={10} />
          Pendente há 24h+
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        {/* Left Side: Checkbox & Text */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button 
            onClick={() => onComplete(task.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform
              ${task.completed 
                ? 'bg-green-500 border-green-500 scale-95' 
                : 'border-slate-500 hover:border-neon-blue hover:scale-110 hover:shadow-[0_0_10px_rgba(0,243,255,0.4)]'}`}
            aria-label="Concluir tarefa"
          >
            {task.completed && <Check size={14} className="text-white animate-check-pop" />}
          </button>

          {isEditing ? (
            <input 
              type="text" 
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="flex-1 bg-slate-800 text-white px-2 py-1 rounded outline-none border border-neon-blue shadow-[0_0_10px_rgba(0,243,255,0.1)]"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          ) : (
            <div className="flex flex-col min-w-0">
              <span className={`text-sm md:text-base truncate transition-colors duration-300 ${task.completed ? 'line-through text-slate-500' : 'text-slate-200 group-hover:text-white'}`}>
                {task.text}
              </span>
              <span className="text-[10px] text-slate-500">
                Criado em: {formatTime(task.createdAt)}
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {isEditing ? (
            <>
               <button 
                onClick={handleSave} 
                className="p-2 text-green-400 hover:bg-green-500/10 hover:text-green-300 hover:scale-110 rounded-lg transition-all duration-200"
                title="Salvar"
              >
                <Save size={18} />
              </button>
              <button 
                onClick={() => {
                  setEditedText(task.text);
                  setIsEditing(false);
                }} 
                className="p-2 text-slate-400 hover:bg-slate-700 hover:text-white hover:scale-110 rounded-lg transition-all duration-200"
                title="Cancelar"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              {!task.completed && (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="p-2 text-neon-blue hover:bg-neon-blue/10 hover:scale-110 hover:shadow-[0_0_10px_rgba(0,243,255,0.2)] rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 md:opacity-100 translate-x-2 group-hover:translate-x-0"
                  aria-label="Editar"
                >
                  <Edit2 size={18} />
                </button>
              )}
              <button 
                onClick={() => onDelete(task.id)} 
                className="p-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:scale-110 hover:shadow-[0_0_10px_rgba(239,68,68,0.2)] rounded-lg transition-all duration-200 translate-x-2 group-hover:translate-x-0"
                aria-label="Excluir"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};