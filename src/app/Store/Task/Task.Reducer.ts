import { createReducer, on } from '@ngrx/store';
import { TaskState } from './Task.State';
import {
  addtasksuccess,
  deletetasksuccess,
  gettasksuccess,
  loadtaskfail,
  loadtasksuccess,
  openpopup,
  updatetasksuccess,
} from './Task.Action';

const _TaskReducer = createReducer(
  TaskState,
  on(loadtasksuccess, (state, action) => {
    return {
      ...state,
      list: [...action.list],
      errormessage: '',
    };
  }),
  on(gettasksuccess, (state, action) => {
    return {
      ...state,
      taskobj: action.obj,
      errormessage: '',
    };
  }),
  on(loadtaskfail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage,
    };
  }),
  on(addtasksuccess, (state, action) => {
    const _newdata = { ...action.inputdata };
    return {
      ...state,
      list: [...state.list, _newdata],
      errormessage: '',
    };
  }),
  on(updatetasksuccess, (state, action) => {
    const _newdata = state.list.map((o) => {
      return o._id === action.inputdata._id ? action.inputdata : o;
    });
    return {
      ...state,
      list: _newdata,
      errormessage: '',
    };
  }),
  on(deletetasksuccess, (state, action) => {
    const _newdata = state.list.filter((o) => o._id !== action.code);
    return {
      ...state,
      list: _newdata,
      errormessage: '',
    };
  }),
  on(openpopup, (state, action) => {
    return {
      ...state,
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
  })
);

export function taskReducer(state: any, action: any) {
  return _TaskReducer(state, action);
}
