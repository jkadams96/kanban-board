"use client";

import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Column from "./Column";

type Task = {
  id: string;
  title: string;
};

type ColumnType = {
  id: string;
  title: string;
  tasks: Task[];
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState<ColumnType[]>([
    {
      id: "todo",
      title: "Todo",
      tasks: [
        { id: "task-1", title: "First task" },
        { id: "task-2", title: "Second task" },
      ],
    },
    {
      id: "progress",
      title: "In Progress",
      tasks: [{ id: "task-3", title: "Working task" }],
    },
    {
      id: "done",
      title: "Done",
      tasks: [{ id: "task-4", title: "Finished task" }],
    },
  ]);

  // ✅ Add task
  const handleAddTask = (columnId: string, title: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: [
                ...col.tasks,
                { id: `task-${Date.now()}`, title },
              ],
            }
          : col
      )
    );
  };

  // ✅ Delete task
  const handleDeleteTask = (taskId: string, columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.filter((t) => t.id !== taskId),
            }
          : col
      )
    );
  };

  // ✅ Drag/Drop reorder
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const [sourceCol, sourceTask] = findTask(active.id);
    const [destCol] = findTask(over.id);

    if (!sourceCol || !sourceTask || !destCol) return;

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === sourceCol.id) {
          return { ...col, tasks: col.tasks.filter((t) => t.id !== active.id) };
        }
        if (col.id === destCol.id) {
          const idx = col.tasks.findIndex((t) => t.id === over.id);
          const newTasks =
            idx === -1
              ? [...col.tasks, sourceTask]
              : arrayMove([...col.tasks, sourceTask], col.tasks.length, idx);
          return { ...col, tasks: newTasks };
        }
        return col;
      })
    );
  };

  const findTask = (taskId: string): [ColumnType | undefined, Task | undefined] => {
    for (let col of columns) {
      const task = col.tasks.find((t) => t.id === taskId);
      if (task) return [col, task];
    }
    return [undefined, undefined];
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 p-6">
        {columns.map((col) => (
          <SortableContext
            key={col.id}
            items={col.tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <Column
              column={col}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
            />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}
