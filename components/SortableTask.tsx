"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableTask({
  id,
  title,
  createdBy,
  onDelete,
}: {
  id: string;
  title: string;
  createdBy: string;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "6px 0",
    background: "#1e293b",
    color: "white",
    borderRadius: "6px",
    cursor: "grab",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  } as const;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{title}</span>
        <button
          onClick={() => onDelete(id)}
          style={{
            marginLeft: "8px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            padding: "0 6px",
          }}
        >
          ✕
        </button>
      </div>
      <small style={{ fontSize: "0.75rem", opacity: 0.7 }}>
        Created by: {createdBy}
      </small>
    </div>
  );
}
