// components/KanbanBoard.tsx
"use client";

import { useQuery, useMutation, gql } from "@apollo/client";

// ✅ Queries & Mutations
const GET_COLUMNS_WITH_TASKS = gql`
  query GetColumnsWithTasks {
    columns(order_by: { position: asc }) {
      id
      title
      tasks(order_by: { position: asc }) {
        id
        title
      }
    }
  }
`;

const ADD_TASK = gql`
  mutation AddTask($title: String!, $columnId: uuid!, $position: Int!) {
    insert_tasks_one(
      object: { title: $title, column_id: $columnId, position: $position }
    ) {
      id
      title
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: uuid!) {
    delete_tasks_by_pk(id: $id) {
      id
    }
  }
`;

export default function KanbanBoard() {
  const { data, loading, error, refetch } = useQuery(GET_COLUMNS_WITH_TASKS);
  const [addTask] = useMutation(ADD_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  const columns = data?.columns || [];

  // Handlers
  async function handleAddTask(columnId: string, title: string) {
    await addTask({
      variables: {
        title,
        columnId,
        position:
          (columns.find((c: any) => c.id === columnId)?.tasks.length || 0) + 1,
      },
    });
    refetch();
  }

  async function handleDeleteTask(id: string) {
    await deleteTask({ variables: { id } });
    refetch();
  }

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {columns.map((col: any) => (
        <div
          key={col.id}
          className="bg-white rounded-xl shadow p-4 flex flex-col gap-2"
        >
          <h2 className="font-semibold text-lg">{col.title}</h2>

          {col.tasks.map((task: any) => (
            <div
              key={task.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded"
            >
              <span>{task.title}</span>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-500 font-bold"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={() => handleAddTask(col.id, "New task")}
            className="text-sm text-blue-500 mt-2"
          >
            ➕ Add Task
          </button>
        </div>
      ))}
    </div>
  );
}
