"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import SortableTask from "./SortableTask";

export default function Column({ column, onAddTask, onDeleteTask }: any) {
  const { setNodeRef } = useDroppable({ id: column.id });
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(column.id, newTaskTitle);
    setNewTaskTitle("");
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        padding: "8px",
        background: "#fafafa",
        borderRadius: "8px",
        minHeight: "150px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Column title */}
      <h2 style={{ marginBottom: 8, textAlign: "center" }}>{column.title}</h2>

      {/* Task list */}
      <SortableContext
        items={column.tasks.map((t: any) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div style={{ flexGrow: 1, marginBottom: "8px" }}>
          {column.tasks.length > 0 ? (
            column.tasks.map((task: any) => (
              <SortableTask key={task.id} task={task} onDeleteTask={onDeleteTask} />
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#888", fontSize: "0.9em" }}>
              No tasks yet
            </p>
          )}
        </div>
      </SortableContext>

      {/* Add task form */}
      <form onSubmit={handleSubmit} style={{ marginTop: "auto" }}>
        <input
          type="text"
          placeholder="New task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "6px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            marginBottom: "4px",
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "8px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Task
        </button>
      </form>
    </div>
  );
}
