import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useTaskStore from '../../store/taskStore';

const initialColumns = {
  todo: { name: 'To Do', items: [] },
  'in-progress': { name: 'In Progress', items: [] },
  review: { name: 'Review', items: [] },
  done: { name: 'Done', items: [] }
};

const KanbanBoard = () => {
  const { tasks, updateTask } = useTaskStore();
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    const cols = { ...initialColumns };
    tasks.forEach(task => {
      if (cols[task.status]) cols[task.status].items.push(task);
      else cols.todo.items.push(task);
    });
    setColumns(cols);
  }, [tasks]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) return;
    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const [movedTask] = sourceCol.items.splice(source.index, 1);
    destCol.items.splice(destination.index, 0, movedTask);
    setColumns({ ...columns, [source.droppableId]: sourceCol, [destination.droppableId]: destCol });
    updateTask(movedTask._id, { status: destination.droppableId });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-4">
        {Object.entries(columns).map(([id, col]) => (
          <Droppable key={id} droppableId={id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-w-[280px]">
                <h3 className="font-bold mb-3">{col.name}</h3>
                {col.items.map((item, idx) => (
                  <Draggable key={item._id} draggableId={item._id} index={idx}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="bg-white dark:bg-gray-700 p-3 mb-2 rounded shadow">
                        {item.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
export default KanbanBoard;
