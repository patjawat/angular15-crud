import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-emp-form-add-edit',
  templateUrl: './emp-form-add-edit.component.html',
  styleUrls: ['./emp-form-add-edit.component.scss']
})
export class EmpFormAddEditComponent {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private employeeService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpFormAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.empForm = _fb.group({
      fname: '',
      lname: '',
      birthdate: '',
      education: '',
      email: '',
      gender: '',
    })

  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.employeeService.updateEmp(this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },

        });
      } else {

        this.employeeService.addEmp(this.empForm.value).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },

        });
      }
    }


  }


}
