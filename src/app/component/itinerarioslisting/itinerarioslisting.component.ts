import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddcustomerComponent } from '../addcustomer/addcustomer.component';
import { Itinerario } from 'src/app/Store/Model/Itinerario.model';

import { ItinerarioService } from 'src/app/service/itinerario.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-itinerarioslisting',
  templateUrl: './itinerarioslisting.component.html',
  styleUrl: './itinerarioslisting.component.css',
})
export class ItinerarioslistingComponent implements OnInit {
  Tasklist!: Itinerario[];
  datasource: any;
  errormessage = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColums: string[] = ['name', 'startDate', 'precio', 'action'];
  jsonstring = localStorage.getItem('userdata') as string;
  user = JSON.parse(this.jsonstring);

  taskForm: any;
  constructor(
    private dialog: MatDialog,
    private store: Store,
    private serv: ItinerarioService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getAllTask();
    this.taskForm = this.fb.group({
      newtask: ['', [Validators.required, this.alphanumericValidator]],
    });
  }
  getAllTask() {
    this.serv.GetAll().subscribe(
      (res) => {
        console.log(res);
        this.Tasklist = res;
        this.datasource = new MatTableDataSource<Itinerario>(this.Tasklist);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
      },
      (err) => {
        alert('Unable to get list');
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

  addTask(Itinerario: string, uId: string) {
    this.serv.Create({ name: Itinerario, user: uId }).subscribe(
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
    this.serv.Update(element._id, { check: element.check }).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        alert('Unable to get list of tasks');
      }
    );
  }

  FunctionDelete(code: string) {
    if (confirm('do you want to remove?')) {
      this.serv.Delete(code).subscribe(
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
