import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {MatTableModule} from '@angular/material/table';

import {MatToolbarModule} from '@angular/material/toolbar';

import {MatIconModule} from '@angular/material/icon';

import {MatButtonModule} from '@angular/material/button';

import {MatDialogModule} from '@angular/material/dialog';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { StudentComponent } from './student/student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentsRoutingModule } from './student.routing.module';
import { StudentService } from './services/student.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [StudentComponent, AddStudentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    StudentsRoutingModule
  ],
  entryComponents: [AddStudentComponent],
  providers: [StudentService]
})
export class StudentsModule { }
