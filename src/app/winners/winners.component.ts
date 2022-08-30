import { MatTableDataSource } from "@angular/material/table";
import { Component, OnInit } from '@angular/core';
import {DataServiceService} from "../service/data-service.service";
import {ToastrService} from "ngx-toastr";
import {models} from "../service/models";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css']
})
export class WinnersComponent implements OnInit {
  pageEvent: any;
  pageSizeOptions=[5,10,15]
  displayedColumns = ['name','score','actions']
  data: Array<models.winner> =[]
  dataSource!: MatTableDataSource<any>

  constructor(
    private dialog: MatDialog,
    private ds: DataServiceService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.ds.getWinners().subscribe((data:any)=>{
      console.log(data)
      this.data = data
      this.dataSource = new MatTableDataSource(this.data)
    })
  }
  delete(value: any){
    console.log(value)
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        data:value,
        action:'remove'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'Yes') {
        console.log('The dialog was closed', result);
    this.ds.deleteWinner(value.id)
        setTimeout(() => {
          this.toastr.success('Removed winner!', 'Success');
        }, 1000);
      } else {
        console.log('No');
      }
    });
  }

}
