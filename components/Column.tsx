"use client";

import { Task } from "lib/types";
import React, { useState } from "react";

type ColumnProps = {
  column: {
    id: string;
    title: string;
    tasks: Task[];
  };
  onAddTask: (columnId: string, title: string) => void;
  onDeleteTask: (taskId: string) => void;
};

export default function Column({ column, onAddTask, onDeleteTask }: ColumnProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(column.id, newTaskTitle);
    setNewTaskTitle("");
  };

  return (
    <div
      style={{
        flex: 1,
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fafafa",
      }}
    >
      <h2>{column.title}</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {column.tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "0.5rem",
              background: "white",
            }}
          >
            {task.title}
            <button
              style={{ marginLeft: "1rem", color: "red" }}
              onClick={() => onDeleteTask(task.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task..."
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button type="submit" style={{ marginTop: "0.5rem" }}>
          Add Task
        </button>
      </form>
    </div>
  );
}
