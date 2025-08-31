import { format } from 'date-fns';
import { FaCheck, FaUndoAlt, FaTrash } from 'react-icons/fa';
import { RxDragHandleDots2 } from 'react-icons/rx';

export default function Task({ task, onToggleDone, onDelete, dragHandleProps }) {
  const categoryColors = {
    work: 'bg-blue-200 text-blue-800',
    home: 'bg-green-200 text-green-800',
    personal: 'bg-purple-200 text-purple-800',
    study: 'bg-yellow-200 text-yellow-800',
    shopping: 'bg-pink-200 text-pink-800',
    fitness: 'bg-red-200 text-red-800',
    finance: 'bg-indigo-200 text-indigo-800',
    family: 'bg-teal-200 text-teal-800',
    hobby: 'bg-orange-200 text-orange-800',
    travel: 'bg-cyan-200 text-cyan-800',
  };

  const categoryClass = task.category
    ? categoryColors[task.category.toLowerCase()] || 'bg-gray-200 text-gray-800'
    : '';

  const priorityColor =
    task.priority >= 8
      ? 'text-red-600 font-bold'
      : task.priority >= 5
      ? 'text-yellow-600 font-semibold'
      : 'text-green-600';

  return (
    <div
      className={`relative flex flex-col justify-between p-4 rounded border
        ${task.done ? 'bg-green-100 border-green-400' : 'bg-white border-gray-300'}
      `}
      style={{ height: '280px', minHeight: '320px' }}
    >
      {/* Drag handle */}
      <div
        {...(dragHandleProps || {})}
        className="absolute top-2 left-2 cursor-grab p-1"
        title="Drag to reorder"
      >
        <RxDragHandleDots2 size={18} className="text-gray-400 hover:text-gray-600" />
      </div>

      {/* Title and Buttons */}
      <div className="flex justify-between items-start mb-2 pl-6">
        <h3
          className={`text-lg font-semibold ${
            task.done ? 'line-through text-gray-500' : ''
          } max-w-[75%]`}
        >
          {task.title}
        </h3>

        <div className="flex gap-2">
          {/* Toggle Done */}
          <button
            onClick={() => onToggleDone(task._id, !task.done)}
            className="p-2 rounded bg-white border border-gray-300 hover:bg-gray-100 transition"
            title={task.done ? 'Undo' : 'Done'}
          >
            {task.done ? (
              <FaUndoAlt size={14} className="text-red-500" />
            ) : (
              <FaCheck size={14} className="text-green-600" />
            )}
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 rounded bg-white border border-gray-300 hover:bg-gray-100 transition"
            title="Delete"
          >
            <FaTrash size={14} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Description */}
      <div
        className={`text-sm text-gray-700 flex-grow overflow-auto ${
          task.done ? 'line-through' : ''
        }`}
      >
        {task.description || (
          <span className="text-gray-400 italic">No description</span>
        )}
      </div>

      {/* Bottom info */}
      <div className="flex flex-wrap gap-3 items-center text-xs mt-4">
        <span className={priorityColor}>Priority: {task.priority}</span>

        {task.category && (
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryClass}`}
          >
            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
          </span>
        )}

        {task.dueDate && (
          <span className="text-gray-500">
            Due: {format(new Date(task.dueDate), 'EEE, MMM d, HH:mm')}
          </span>
        )}
      </div>
    </div>
  );
}
