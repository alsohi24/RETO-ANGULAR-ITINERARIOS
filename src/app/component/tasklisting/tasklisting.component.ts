import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddcustomerComponent } from '../addcustomer/addcustomer.component';
import { Task } from 'src/app/Store/Model/Task.model';
import {
  getErrormessage,
  gettasklist,
} from 'src/app/Store/Task/Task.Selectors';
import { deletetask, gettask, loadtask } from 'src/app/Store/Task/Task.Action';
import { TaskService } from 'src/app/service/task.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-tasklisting',
  templateUrl: './tasklisting.component.html',
  styleUrl: './tasklisting.component.css',
})
export class TasklistingComponent implements OnInit {
  Tasklist!: Task[];
  datasource: any;
  errormessage = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColums: string[] = ['check', 'name', 'startDate', 'action'];
  jsonstring = localStorage.getItem('userdata') as string;
  user = JSON.parse(this.jsonstring);

  taskForm: any;
  constructor(
    private dialog: MatDialog,
    private store: Store,
    private taskServ: TaskService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getAllTask();
    this.taskForm = this.fb.group({
      newtask: ['', [Validators.required, this.alphanumericValidator]],
    });
  }
  getAllTask() {
    this.taskServ.GetAll().subscribe(
      (res) => {
        console.log(res);
        this.Tasklist = res;
        this.datasource = new MatTableDataSource<Task>(this.Tasklist);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
      },
      (err) => {
        alert('Unable to get list of tasks');
      }
    );
  }

  alphanumericValidator(control: AbstractControl): ValidationErrors | null {
    const alphanumericPattern = /^[a-zA-Z0-9]*$/;
    if (control.value && !alphanumericPattern.test(control.value)) {
      return { alphanumeric: true };
    }
    return null;
  }

  FunctionAddTask() {
    let valTask = this.taskForm.value.newtask;
    console.log('Form Submitted', this.user);

    if (this.taskForm.valid) {
      this.addTask(valTask, this.user._id);
      console.log('Form Submitted', valTask);
    }
  }

  addTask(task: string, uId: string) {
    this.taskServ.Create({ name: task, user: uId }).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        alert('Unable to get list of tasks');
      }
    );
  }

  onStatusChange(element: any) {
    console.log(element);
    this.taskServ.Update(element._id, { check: element.check }).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        alert('Unable to get list of tasks');
      }
    );
  }

  FunctionEdit(code: string) {
    this.OpenPopup(code, 'Update Customer');
    this.store.dispatch(gettask({ id: code }));
  }

  FunctionDelete(code: string) {
    if (confirm('do you want to remove?')) {
      this.taskServ.Delete(code).subscribe(
        (res) => {
          this.ngOnInit();
        },
        (err) => {
          console.log(err);
          alert('Unable to get list of tasks');
        }
      );
    }
  }

  OpenPopup(code: string, title: string) {
    this.dialog.open(AddcustomerComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: code,
        title: title,
      },
    });
  }
}
