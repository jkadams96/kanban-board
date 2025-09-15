type TaskCardProps = {
  title: string;
};

export default function TaskCard({ title }: TaskCardProps) {
  return (
    <div
      style={{
        background: "white",
        padding: "0.5rem",
        margin: "0.5rem 0",
        borderRadius: "6px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      }}
    >
      {title}
    </div>
  );
}
