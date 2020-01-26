import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  { path: '', component: StudentComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}
