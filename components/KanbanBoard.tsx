"use client";

import { useMutation, useQuery } from "@apollo/client";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  ADD_TASK,
  DELETE_TASK,
  GET_COLUMNS_WITH_TASKS,
  UPDATE_TASK_POSITION,
} from 'lib/queries';
import Column from "./Column";

export default function KanbanBoard() {
  const { data, loading, error, refetch } = useQuery(GET_COLUMNS_WITH_TASKS);
  const [addTask] = useMutation(ADD_TASK);
  const [updateTaskPosition] = useMutation(UPDATE_TASK_POSITION);
  const [deleteTask] = useMutation(DELETE_TASK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const columns = data?.columns || [];

  // ✅ Add new task
  function handleAddTask(columnId: string, title: string) {
    addTask({
      variables: {
        title,
        column_id: columnId,
        position:
          columns.find((c: any) => c.id === columnId)?.tasks.length || 0,
      },
    })
      .then(() => refetch())
      .catch((err) => console.error("Add error:", err));
  }

  // ✅ Delete task
  function handleDeleteTask(taskId: string) {
    deleteTask({ variables: { id: taskId } })
      .then(() => refetch())
      .catch((err) => console.error("Delete error:", err));
  }

  // ✅ Drag/drop reorder
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return;

    const sourceCol = columns.find((col: any) =>
      col.tasks.some((t: any) => t.id === active.id) // 🔧 fix line 74
    );
    const destCol = columns.find(
      (col: any) =>
        col.tasks.some((t: any) => t.id === over.id) || col.id === over.id
    );
    if (!sourceCol || !destCol) return;

    const sourceTaskIdx = sourceCol.tasks.findIndex(
      (t: any) => t.id === active.id
    );

    // ✅ compute drop destination
    let destTaskIdx = destCol.tasks.findIndex((t: any) => t.id === over.id); // 🔧 fix line 56
    if (destTaskIdx === -1) destTaskIdx = destCol.tasks.length;

    const movedTask = sourceCol.tasks[sourceTaskIdx];

    updateTaskPosition({
      variables: {
        id: movedTask.id,
        position: destTaskIdx,
        column_id: destCol.id,
      },
    })
      .then(() => refetch())
      .catch((err) => console.error("Update error:", err));
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: 16, padding: 16 }}>
        {columns.map((col: any) => (
          <Column
            key={col.id}
            column={col}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </DndContext>
  );
}
