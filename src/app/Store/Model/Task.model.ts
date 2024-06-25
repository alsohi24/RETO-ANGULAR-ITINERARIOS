export interface Task {
  _id: string;
  name: string;
  user: string;
  startDate: string;
  endDate: string;
  check: boolean;
  status: boolean;
}

export interface TaskModel {
  errormessage: string;
  list: Task[];
  taskobj: Task;
}
