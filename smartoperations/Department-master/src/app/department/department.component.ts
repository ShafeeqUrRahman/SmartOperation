import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DepartmentService } from '../service/department.service';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { Department } from '../model/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers: [DepartmentService]
})
export class DepartmentComponent implements OnInit {

  public _contactForm: FormGroup;
  DepartmentName = new FormControl();
  ServiceType = new FormControl();
  departments: string[] = ['Ground', 'Cargo', 'Engineering', 'Inflight Operations',
    'Flight Operations', 'Security', 'Catering', 'Medical'];
  services: string[] = ['Customer Service', 'Ramp', 'Ground Support', 'Cabin Appearence',
    'Cargo', 'Engineering', 'Inflight Operations', 'Flight Operations', 'Security', 'Catering', 'Medical'];
  filteredOptions: Observable<string[]>;
  filteredOptions2: Observable<string[]>;
  constructor(private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DepartmentComponent>,
    private _contactService: DepartmentService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this._contactForm = this._formBuilder.group({
      _id: [this.data._id],
      airportType: [this.data.airportType, [Validators.required]],
      departmentName: [this.data.departmentName, [Validators.required]],
      serviceType: [this.data.serviceType, [Validators.required]],
      skill: [this.data.skill, [Validators.required]]
    });

    this.refreshDepartmentList();

    this.filteredOptions = this.DepartmentName.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.filteredOptions2 = this.ServiceType.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter2(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.departments.filter(department => department.toLowerCase().includes(filterValue));
  }

  private _filter2(value: string): string[] {
    const filterValue2 = value.toLowerCase();

    return this.services.filter(service => service.toLowerCase().includes(filterValue2));
  }

  onSubmit(form: NgForm) {
    this._contactService.addDepartment(form.value).subscribe((res) => {
      this._contactForm = this._formBuilder.group({
        _id: [this.data._id],
        airportType: [this.data.airportType, [Validators.required]],
        departmentName: [this.data.departmentName, [Validators.required]],
        serviceType: [this.data.serviceType, [Validators.required]],
        skill: [this.data.skill, [Validators.required]]
      });
    });
    this.dialogRef.close();
    this.refreshDepartmentList();

  }

  refreshDepartmentList() {
    this._contactService.getAllDepartments().subscribe(res => {
      this._contactService._departmentList = res as Department[];
    });
  }
}
