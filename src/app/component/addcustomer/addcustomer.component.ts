import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  addCUSTOMER,
  updateCUSTOMER,
} from 'src/app/Store/Customer/Customer.Action';
import { getcustomer } from 'src/app/Store/Customer/Customer.Selectors';
import { Customers } from 'src/app/Store/Model/Customer.model';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css'],
})
export class AddcustomerComponent implements OnInit {
  title = 'Agregar tiempo';
  isedit = false;
  dialogdata: any;
  editcode!: number;
  editdata!: Customers;

  constructor(
    private builder: FormBuilder,
    private ref: MatDialogRef<AddcustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {}
  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.editcode = this.dialogdata.code;
  }

  ClosePopup() {
    this.ref.close();
  }

  associateform = this.builder.group({
    time: this.builder.control(0),
  });

  SaveAssociate() {
    if (this.associateform.valid) {
      const _obj: any = {
        time: this.associateform.value.time as number,
      };
      if (_obj.time === 0) {
        this.store.dispatch(addCUSTOMER({ inputdata: _obj }));
      } else {
        this.store.dispatch(updateCUSTOMER({ inputdata: _obj }));
      }
      this.ClosePopup();
    }
  }
}
