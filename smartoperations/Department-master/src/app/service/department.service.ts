import { Injectable } from '@angular/core';
import { Department } from '../model/department';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DepartmentService {


  _departmentList: Department[] ;
  selectedDepartment : Department;

  readonly baseURL ='http://localhost:3000/department';

  constructor(private http: HttpClient) { }

  addDepartment(department: Department) {
    return this.http.post(this.baseURL, department);
  }

  getAllDepartments() {
    return this.http.get(this.baseURL);
  }

  editDepartment(department: Department) {
    return this.http.patch(this.baseURL + `/${department._id}`, department);
  }


  deleteDepartment(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }


}
