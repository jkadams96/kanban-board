export type Task = {
  id: string;
  title: string;
  position: number;
  column_id: string;
};

export type ColumnType = {
  id: string;
  title: string;
  position: number;
  tasks: Task[];
};
