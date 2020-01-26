import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../services/student.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  columns = ['name', 'roll_no', 'degree', 'city'];
  displayColumns = [...this.columns, 'edit'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('table', {static: true}) table: MatTable<any>;

  constructor(private studentService: StudentService, private dialog: MatDialog) { }

  ngOnInit() {
    this.studentService.getStudents()
    .subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = (data: any, filterValue: string) =>
                              data.name.trim().toLowerCase().includes(filterValue);
    });
  }

  openDailog(action, row) {
    const dialog = this.dialog.open(AddStudentComponent, {
      data: {
        row: row || {},
        action
      }
    });

    // update datatable when dialog closed
    dialog.afterClosed().subscribe((result) => {
      if (result.status) {
        const index = this.dataSource.data.findIndex(item => item._id == result.data._id);
        if (index > -1) {
          // update exiting row;
          this.dataSource.data[index] = result.data;
        } else {
          // add new row
          this.dataSource.data.push(result.data);
        }
        this.dataSource.filter = ''; // hack to refresh the table;
        alert(result.message);
      } else {
        alert(result.message);
      }
    });
  }

  applyFilter(value) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
