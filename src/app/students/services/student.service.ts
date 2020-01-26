import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class StudentService {
  baseUrl = environment.apiBaseUrl;

  get  headers() {
    return {
      'x-auth-token': this.userSvc.token
    };
}
  constructor(private http: HttpClient, private userSvc: UserService) {
  }

  getStudents() {
    return this.http.get(`${this.baseUrl}/students`, {headers: this.headers});
  }

  addStudent(student) {
    return this.http.post(`${this.baseUrl}/students`, student, {headers: this.headers});
  }

  updateStudent(studentId, student) {
     return this.http.put(`${this.baseUrl}/students/${studentId}`, student, {headers: this.headers});
  }
}
