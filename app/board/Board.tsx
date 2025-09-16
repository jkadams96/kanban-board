"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import SortableTask from "@components/SortableTask";
import { useUserData } from "@nhost/react";

type Task = { id: string; title: string; createdBy: string };
type Column = { id: string; title: string; createdBy: string; tasks: Task[] };

type ColumnProps = {
  column: Column;
  onAddTask: (colId: string) => void;
  onDeleteTask: (colId: string, taskId: string) => void;
};

function ColumnComponent({ column, onAddTask, onDeleteTask }: ColumnProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    flex: 1,
    padding: "12px",
    background: "#0f172a",
    borderRadius: "8px",
    minWidth: "220px",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h2
        style={{ color: "white", marginBottom: "8px", cursor: "grab" }}
        {...attributes}
        {...listeners}
      >
        {column.title}
      </h2>

      <SortableContext
        items={column.tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {column.tasks.map((task) => (
          <SortableTask
            key={task.id}                // ✅ key is a string, not a Task or void
            id={task.id}
            title={task.title}
            createdBy={task.createdBy}
            onDelete={(id) => onDeleteTask(column.id, id)}
          />
        ))}
      </SortableContext>

      <button
        onClick={() => onAddTask(column.id)}
        style={{
          marginTop: "8px",
          padding: "6px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        ＋ Add Task
      </button>
    </div>
  );
}

export default function Board() {
  const user = useUserData();
  const [columns, setColumns] = useState<Column[]>([
    { id: "col-1", title: "Todo", createdBy: "system", tasks: [] },
    { id: "col-2", title: "In Progress", createdBy: "system", tasks: [] },
    { id: "col-3", title: "Done", createdBy: "system", tasks: [] },
  ]);

  function handleAddTask(colId: string) {
    const title = window.prompt("Enter task name:");
    if (!title || !user) return;
    setColumns((cols) =>
      cols.map((col) =>
        col.id === colId
          ? {
              ...col,
              tasks: [
                ...col.tasks,
                { id: `t${Date.now()}`, title, createdBy: user.id },
              ],
            }
          : col
      )
    );
  }

  function handleDeleteTask(colId: string, taskId: string) {
    setColumns((cols) =>
      cols.map((col) =>
        col.id === colId
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col
      )
    );
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    setColumns((cols) => {
      const next = [...cols];
      const fromCol = next.find((c) => c.tasks.some((t) => t.id === active.id));
      if (!fromCol) return cols;
      const toCol =
        next.find((c) => c.tasks.some((t) => t.id === over.id)) ||
        next.find((c) => c.id === over.id);
      if (!toCol) return cols;
      const fromIndex = fromCol.tasks.findIndex((t) => t.id === active.id);
      const overTaskIndex = toCol.tasks.findIndex((t) => t.id === over.id);
      const toIndex = overTaskIndex >= 0 ? overTaskIndex : toCol.tasks.length;
      if (fromCol.id === toCol.id) {
        if (fromIndex !== toIndex) {
          fromCol.tasks = arrayMove(fromCol.tasks, fromIndex, toIndex);
        }
      } else {
        const [moved] = fromCol.tasks.splice(fromIndex, 1);
        toCol.tasks.splice(toIndex, 0, moved);
      }
      return next;
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setColumns((cols) => {
      const next = [...cols];
      const colIds = next.map((c) => c.id);
      const activeIsColumn = colIds.includes(String(active.id));
      const overIsColumn = colIds.includes(String(over.id));
      if (activeIsColumn && overIsColumn) {
        const from = next.findIndex((c) => c.id === active.id);
        const to = next.findIndex((c) => c.id === over.id);
        return arrayMove(next, from, to);
      }
      return next;
    });
  }

  return (
    <div style={{ display: "flex", gap: "16px", padding: "20px" }}>
      <DndContext
        collisionDetection={closestCorners}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columns.map((c) => c.id)}
          strategy={horizontalListSortingStrategy}
        >
          {columns.map((col) => (
            <ColumnComponent
              key={col.id}
              column={col}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
