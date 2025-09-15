"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "app/lib/types";

type SortableTaskProps = {
  task: Task;
  columnId: string;
  index: number;
  onDeleteTask: (id: string) => void;
};

export default function SortableTask({ task, columnId, index, onDeleteTask }: SortableTaskProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-100 rounded-md p-2 flex justify-between items-center cursor-move"
    >
      <span>{task.title}</span>
      <button
        onClick={() => onDeleteTask(task.id)}
        className="text-red-500 font-bold hover:text-red-700"
      >
        ✕
      </button>
    </div>
  );
}
