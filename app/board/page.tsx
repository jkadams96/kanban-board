import KanbanBoard from "../../components/KanbanBoard";

export default function BoardPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>🗂️ Kanban Board</h1>
      <KanbanBoard />
    </main>
  );
}
