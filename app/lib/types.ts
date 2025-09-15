export type Task = {
  id: string;
  title: string;
  position: number;
};

export type ColumnType = {
  id: string;
  title: string;
  position: number;
  tasks: Task[];
};
