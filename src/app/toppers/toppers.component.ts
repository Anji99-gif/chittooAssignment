import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ToastrService} from 'ngx-toastr';
import {DataServiceService} from '../service/data-service.service';

@Component({
  selector: 'app-toppers',
  templateUrl: './toppers.component.html',
  styleUrls: ['./toppers.component.css']
})
export class ToppersComponent implements OnInit {

  data: any[] = [];
  dataSource!: MatTableDataSource<any>;

  displayedColumns = ['name', 'score'];
  pageEvent: any;
  pageSizeOptions = [5, 10, 15];
  isLoading: boolean = true;

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private ds: DataServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.ds.getUsers().subscribe((data: any) => {
      this.isLoading = true
      this.data = data;
      console.log(this.data);
      this.data = this.data.filter((ob) => ob.score > 90);
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = function (record, filter) {
        console.log(filter);
        return record.score == filter;
      };
      this.isLoading = false

    });
  }

}
