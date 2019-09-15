// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatDialogModule, MatToolbarModule, MatIconModule, MatSelectModule,MatAutocompleteModule } from '@angular/material';
import { DepartmentService } from './service/department.service';
import { DepartmentListComponent } from './department-list/department-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    DepartmentListComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatAutocompleteModule,
    HttpClientModule
  ],
  providers: [DepartmentService],
  entryComponents: [DepartmentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
