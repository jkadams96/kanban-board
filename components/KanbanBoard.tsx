"use client";

import { useMutation, useQuery } from "@apollo/client";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  ADD_TASK,
  DELETE_TASK,
  GET_COLUMNS_WITH_TASKS,
  UPDATE_TASK_POSITION,
} from "../app/lib/queries";
import Column from "./Column";

export default function KanbanBoard() {
  const { data, loading, error, refetch } = useQuery(GET_COLUMNS_WITH_TASKS);
  const [addTask] = useMutation(ADD_TASK);
  const [updateTaskPosition] = useMutation(UPDATE_TASK_POSITION);
  const [deleteTask] = useMutation(DELETE_TASK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const columns = data?.columns || [];

  // ✅ Add Task
  function handleAddTask(columnId: string, title: string) {
    addTask({
      variables: {
        title,
        column_id: columnId,
        position: columns.find((c: any) => c.id === columnId)?.tasks.length || 0,
      },
      refetchQueries: [{ query: GET_COLUMNS_WITH_TASKS }], // refresh after add
    });
  }

  // ✅ Delete Task
  function handleDeleteTask(taskId: string) {
    deleteTask({
      variables: { id: taskId },
      refetchQueries: [{ query: GET_COLUMNS_WITH_TASKS }], // refresh after delete
    });
  }

  // ✅ Drag/Drop
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return;

    const sourceCol = columns.find((col: any) =>
      col.tasks.some((t: any) => t.id === active.id)
    );
    const destCol = columns.find(
      (col: any) =>
        col.tasks.some((t: any) => t.id === over.id) || col.id === over.id
    );
    if (!sourceCol || !destCol) return;

    const sourceTaskIdx = sourceCol.tasks.findIndex(
      (t: any) => t.id === active.id
    );
    let destTaskIdx = destCol.tasks.findIndex((t: any) => t.id === over.id);
    if (destTaskIdx === -1) destTaskIdx = destCol.tasks.length;

    const movedTask = sourceCol.tasks[sourceTaskIdx];

    updateTaskPosition({
      variables: {
        id: movedTask.id,
        position: destTaskIdx,
        column_id: destCol.id,
      },
      refetchQueries: [{ query: GET_COLUMNS_WITH_TASKS }], // refresh after move
    });
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
