import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DepartmentService } from '../service/department.service';
import { DepartmentComponent } from '../department/department.component';
import { Department } from '../model/department';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  isPopupOpened = true;

  constructor(private dialog?: MatDialog,
    private _departmentService?: DepartmentService) { }

  ngOnInit() {

  this.refreshDepartmentList();
  }

  refreshDepartmentList() {
    this._departmentService.getAllDepartments().subscribe(res =>{
      this._departmentService._departmentList = res as Department[];
    });
  }

  get DepartmentList() {
    return this._departmentService.getAllDepartments();
  }

  addDepartment() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(DepartmentComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
    this.refreshDepartmentList();
  }


  // this.http.get(this.apiURL).pipe(
  //   map(response => response.text()),
  // ).subscribe(dataArray => {
  //   this.userForm.patchValue(dataArray.find(
  //     department => department.id === this.route.snapshot.paramMap.get('_id'),
  //   ));
  // });


  // editDepartment(Depart: Department) {
  //   this.isPopupOpened = true;
  //   this.http.get(this.apiURL).pipe(
  //     map(response => response.text()),
  //     ).subscribe(dataArray => {
  //       this.userForm.patchValue(dataArray.find(
  //         department => department.id === this.route.snapshot.paramMap.get('_id'),
  //         ));
  //   const department = this._departmentService.getAllDepartments().find(c => c._id === id);
  //   const dialogRef = this.dialog.open(DepartmentComponent, {
  //     data: department
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.isPopupOpened = false;
  //   });
  // }


  deleteDepartment(_id: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this._departmentService.deleteDepartment(_id).subscribe((res) => {
        this.refreshDepartmentList();
       });
    }
  }


}
