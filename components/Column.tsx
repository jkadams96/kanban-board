"use client";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableTask from "./SortableTask";

type Task = {
  id: string;
  title: string;
  createdBy?: string; // may be absent on some tasks
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

export default function ColumnComponent({
  column,
  onAddTask,
  onDeleteTask,
}: {
  column: Column;
  onAddTask: (colId: string) => void;
  onDeleteTask: (colId: string, taskId: string) => void;
}) {
  return (
    <div
      style={{
        flex: 1,
        padding: "12px",
        background: "#0f172a",
        borderRadius: "8px",
        minWidth: "220px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ color: "white", marginBottom: "8px" }}>{column.title}</h2>

      <SortableContext
        items={column.tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {column.tasks.map((task) => (
          <SortableTask
            key={task.id}
            id={task.id}
            title={task.title}
            createdBy={task.createdBy ?? ""}   // ✅ pass createdBy so TS is happy
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