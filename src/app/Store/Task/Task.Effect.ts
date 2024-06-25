import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from 'src/app/service/task.service';
import {
  addtask,
  addtasksuccess,
  deletetasksuccess,
  deletetask,
  gettask,
  gettasksuccess,
  loadtask,
  loadtaskfail,
  loadtasksuccess,
  updatetask,
  updatetasksuccess,
} from './Task.Action';
import { catchError, exhaustMap, of, map, switchMap } from 'rxjs';
import { showalert } from '../Common/App.Action';

@Injectable()
export class TaskEffects {
  constructor(private actin$: Actions, private service: TaskService) {}

  _loadtask = createEffect(() =>
    this.actin$.pipe(
      ofType(loadtask),
      exhaustMap((action) => {
        console.log(action);
        return this.service.GetAll().pipe(
          map((data) => {
            console.log(data);
            return loadtasksuccess({ list: data });
          }),
          catchError((_error) =>
            of(loadtaskfail({ errormessage: _error.message }))
          )
        );
      })
    )
  );

  _gettask = createEffect(() =>
    this.actin$.pipe(
      ofType(gettask),
      exhaustMap((action) => {
        return this.service.Getbycode(action.id).pipe(
          map((data) => {
            return gettasksuccess({ obj: data });
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'Failed to fetch data :' + _error.message,
                resulttype: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _addtask = createEffect(() =>
    this.actin$.pipe(
      ofType(addtask),
      switchMap((action) => {
        return this.service.Create(action.inputdata).pipe(
          switchMap((data) => {
            return of(
              addtasksuccess({ inputdata: action.inputdata }),
              showalert({
                message: 'Created successfully.',
                resulttype: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'Failed to create task',
                resulttype: 'fail',
              })
            )
          )
        );
      })
    )
  );
  _updatetask = createEffect(() =>
    this.actin$.pipe(
      ofType(updatetask),
      switchMap((action) => {
        return this.service.Update(action.inputdata).pipe(
          switchMap((data) => {
            return of(
              updatetasksuccess({ inputdata: action.inputdata }),
              showalert({
                message: 'Upadted successfully.',
                resulttype: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'Failed to update task',
                resulttype: 'fail',
              })
            )
          )
        );
      })
    )
  );
  _deletetask = createEffect(() =>
    this.actin$.pipe(
      ofType(deletetask),
      switchMap((action) => {
        return this.service.Delete(action.code).pipe(
          switchMap((data) => {
            return of(
              deletetasksuccess({ code: action.code }),
              showalert({
                message: 'Deleted successfully.',
                resulttype: 'pass',
              })
            );
          }),
          catchError((_error) =>
            of(
              showalert({
                message: 'Failed to delete task',
                resulttype: 'fail',
              })
            )
          )
        );
      })
    )
  );
}
