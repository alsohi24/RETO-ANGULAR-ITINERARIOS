import { TaskModel, Task } from '../Model/Task.model';

export const TaskState: TaskModel = {
  list: [],
  errormessage: '',
  taskobj: {
    _id: '',
    name: '',
    startDate: '',
    endDate: '',
    check: true,
    status: true,
    user: '',
  },
};
