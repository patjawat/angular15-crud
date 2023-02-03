import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpFormAddEditComponent } from './emp-form-add-edit/emp-form-add-edit.component';
import { EmployeeService } from './services/employee.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';

export interface UserData {
  id: string;
  fname: string;
  lname: string;
  email: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-ng15';

  displayedColumns: string[] = ['id', 'fname', 'lname', 'email','action'];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _enployeeService:EmployeeService,
    private _coreService: CoreService
    ){

  }

  ngOnInit(): void {
this.empList()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditEmpForm(){
    const dialogRef = this._dialog.open(EmpFormAddEditComponent)
    dialogRef.afterClosed().subscribe({
      next:(val:any) => {
        if(val){
          this._coreService.openSnackBar('ok','success');
          this.empList();
        }
      },
    })
  }

  openEditEmpForm(data:any){
    const dialogRef = this._dialog.open(EmpFormAddEditComponent,{
      data:data
    })
    dialogRef.afterClosed().subscribe({
      next:(val:any) => {
        if(val){
          this._coreService.openSnackBar('ok','Edit success');
          this.empList();
        }
      },
    })
   
  }

  empList(){
    this._enployeeService.listEmployees().subscribe({
      next: (res:any) =>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err:any) =>{
        console.error(err);
      }
    });
  }

  deleteEmp(id:number){
    this._enployeeService.deleteEmployees(id).subscribe({
      next: (res:any) =>{
        this._coreService.openSnackBar('ok','delete success');
        this.empList();
      },
      error: (err:any) =>{
        console.error(err);
      }
    })
  }
}
