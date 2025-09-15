"use client";

import { useDraggable } from "@dnd-kit/core";

export default function SortableTask({ task, onDelete }: any) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    padding: "8px",
    marginBottom: "8px",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span>{task.title}</span>
      <button
        onClick={() => onDelete(task.id)}
        style={{
          marginLeft: "8px",
          background: "transparent",
          border: "none",
          color: "red",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        ✕
      </button>
    </div>
  );
}
