import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup;
  row;
  action;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private studentSvc: StudentService) { }

  ngOnInit() {
    this.row = this.data.row;
    this.action = this.data.action;
    this.createForm();
  }

  createForm() {
    this.studentForm = this.fb.group({
      name: [this.row.name, [Validators.required, Validators.minLength(3)]],
      roll_no: [this.row.roll_no, Validators.required],
      degree: [this.row.degree, Validators.required],
      city: [this.row.city, Validators.required]
    });
  }

  addStudent() {
    const student = this.studentForm.value;
    this.studentSvc.addStudent(student)
    .subscribe(response => {
      console.log(response);
      this.dialogRef.close({status: true, message: 'Student details added successfully', data: response});
    }, error => {
       this.dialogRef.close({status: false, message: 'Error while saving data'});
    });
  }

  updateStudent() {
    const student = this.studentForm.value;
    this.studentSvc.updateStudent(this.row._id, student)
    .subscribe(response => {
      console.log(response);
      this.dialogRef.close({status: true, message: 'Student details updated successfully', data: response});
    }, error => {
       this.dialogRef.close({status: false, message: 'Error while saving data'});
    });
  }

}
