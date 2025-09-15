"use client";

import { useState } from "react";
import SortableTask from "./SortableTask";

type Task = {
  id: string;
  title: string;
};

type ColumnType = {
  id: string;
  title: string;
  tasks: Task[];
};

type ColumnProps = {
  column: ColumnType;
  onAddTask: (columnId: string, title: string) => void;
  onDeleteTask: (taskId: string, columnId: string) => void;
};

export default function Column({ column, onAddTask, onDeleteTask }: ColumnProps) {
  const [newTask, setNewTask] = useState("");

  return (
    <div className="bg-gray-200 p-4 rounded-lg w-72">
      <h2 className="font-bold text-lg mb-3">{column.title}</h2>

      <div className="flex gap-2 mb-3">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
          className="flex-1 px-2 py-1 border rounded"
        />
        <button
          onClick={() => {
            if (newTask.trim()) {
              onAddTask(column.id, newTask);
              setNewTask("");
            }
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          +
        </button>
      </div>

      <div className="space-y-2">
        {column.tasks.map((task, idx) => (
          <SortableTask
            key={task.id}
            task={task}
            columnId={column.id}
            index={idx}
            onDeleteTask={(id) => onDeleteTask(id, column.id)}
          />
        ))}
      </div>
    </div>
  );
}
