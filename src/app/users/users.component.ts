import { DataServiceService } from './../service/data-service.service';
import { DialogComponent } from './../dialog/dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  // data: any[] =  [
  //   {name:"Rohan", age:23, score:85},
  //   {name:"Hari", age:24, score:97},
  //   {name:"Adithya", age:25, score:98},
  //   {name:"Syam", age:18, score:81},
  //   {name:"anji", age:21, score:75},
  //   {name:"Ram", age:23, score:85},
  //   {name:"Sai", age:22, score:95},
  //   {name:"Chandu", age:19, score:85},
  //   {name:"Kumar", age:17, score:85},
  //   {name:"Ravi", age:21, score:75},
  //   {name:"Sunder", age:18, score:88},
  //   {name:"Koti", age:13, score:97}
  // ]

  data: any[] = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns = ['name', 'age', 'score', 'actions'];
  pageEvent: any;
  pageSizeOptions = [5, 10, 15];
  isLoading: boolean = true;

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private ds: DataServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.ds.getUsers().subscribe((data: any) => {
      this.isLoading = true
      this.data = data;
      console.log(this.data);
      this.data = this.data.filter((ob) => ob.age < 21);
      this.dataSource = new MatTableDataSource(this.data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = function (record, filter) {
        console.log(filter);
        return record.score == filter;
      };
      this.isLoading = false

    });
  }
  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRecord(value: any) {
    console.log(value);
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        data:value,
        action:'add'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Yes') {
        console.log('The dialog was closed', result);
        this.ds.addToWinners(value)
        setTimeout(() => {
          this.toastr.success('Added to winners!', 'Success');
        }, 800);
      } else {
        console.log('No');
      }
    });
  }


}
