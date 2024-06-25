import { createAction, props } from '@ngrx/store';
import { Task } from '../Model/Task.model';

export const LOAD_TASK = '[task page]load task';
export const LOAD_TASK_SUCCESS = '[task page]load task success';
export const LOAD_TASK_FAIL = '[task page]load task fail';
export const ADD_TASK = '[task page]add task';
export const ADD_TASK_SUCCESS = '[task page]add task success';
export const UPDATE_TASK = '[task page]update task';
export const UPDATE_TASK_SUCCESS = '[task page]update task success';

export const DELETE_TASK = '[task page]delete task';
export const DELETE_TASK_SUCCESS = '[task page]delete task success';

export const GET_TASK = '[task page]get task';
export const GET_TASK_SUCCESS = '[task page]get task success';
export const OPEN_POPUP = '[task page]open popup';

export const loadtask = createAction(LOAD_TASK);
export const loadtasksuccess = createAction(
  LOAD_TASK_SUCCESS,
  props<{ list: Task[] }>()
);
export const loadtaskfail = createAction(
  LOAD_TASK_FAIL,
  props<{ errormessage: string }>()
);

export const addtask = createAction(ADD_TASK, props<{ inputdata: Task }>());
export const addtasksuccess = createAction(
  ADD_TASK_SUCCESS,
  props<{ inputdata: Task }>()
);

export const updatetask = createAction(
  UPDATE_TASK,
  props<{ inputdata: Task }>()
);
export const updatetasksuccess = createAction(
  UPDATE_TASK_SUCCESS,
  props<{ inputdata: Task }>()
);

export const deletetask = createAction(DELETE_TASK, props<{ code: string }>());
export const deletetasksuccess = createAction(
  DELETE_TASK_SUCCESS,
  props<{ code: string }>()
);

export const gettask = createAction(GET_TASK, props<{ id: string }>());
export const gettasksuccess = createAction(
  GET_TASK_SUCCESS,
  props<{ obj: Task }>()
);

export const openpopup = createAction(OPEN_POPUP);
