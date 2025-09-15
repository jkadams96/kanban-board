"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type SortableTaskProps = {
  task: { id: string; title: string };
  columnId: string;
  index: number;
  onDeleteTask: (id: string) => void;
};

export default function SortableTask({ task, onDeleteTask }: SortableTaskProps) {
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
      className="bg-white rounded-md p-2 flex justify-between items-center shadow cursor-move"
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
