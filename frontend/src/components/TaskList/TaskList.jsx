// import Task from '../Task/Task.jsx';

// export default function TaskList({ tasks, onToggleDone, onDelete }) {
//   if (!tasks.length) {
//     return <p className="text-center text-gray-500">No tasks found.</p>;
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-5 pl-2 pr-2">
//       {tasks.map(task => (
//         <Task
//           key={task._id}
//           task={task}
//           onToggleDone={onToggleDone}
//           onDelete={onDelete}
//         />
//       ))}
//     </div>
//   );
// } //BEFORE DragNDrop TO REMEMBER


// if (isLoading) { return ( <div className="flex justify-center items-center h-64"> <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div> </div> ); }  //LOADER INSTEAD OF SKELETON





import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Task from '../Task/Task.jsx';
import { useState, useEffect } from 'react';

function SortableItem({ task, onToggleDone, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Task
        task={task}
        onToggleDone={onToggleDone}
        onDelete={onDelete}
        dragHandleProps={listeners}
      />
    </div>
  );
}



function TaskSkeleton() {
  return (
    <div className="border border-gray-300 rounded-md p-4 animate-pulse bg-gray-200 h-[320px]"></div>
  );
}

export default function TaskList({ tasks, onToggleDone, onDelete, onReorder, isLoading, sort}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      const sorted = [...tasks].sort((a, b) => {
        if (sort === 'priority_desc') {
          return b.priority - a.priority;
        } else {
          return a.priority - b.priority;
        }
      });
      setItems(sorted);
    }
  }, [tasks, isLoading, sort]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeIndex = items.findIndex((t) => t._id === active.id);
    const overIndex = items.findIndex((t) => t._id === over.id);
    const newPriority = items[overIndex].priority;

    const newItems = [...items];
    const [movedItem] = newItems.splice(activeIndex, 1);
    newItems.splice(overIndex, 0, movedItem);
    setItems(newItems);

    if (onReorder) {
      onReorder([{ id: active.id, priority: newPriority }]);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-5 px-2 min-h-[384px]">
        {[...Array(9)].map((_, i) => (
          <TaskSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return <p className="text-center text-gray-500">No tasks found.</p>;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} autoScroll={false}>
      <SortableContext items={items.map((task) => task._id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-5 px-2">
          {items.map((task) => (
            <SortableItem
              key={task._id}
              task={task}
              onToggleDone={onToggleDone}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}