import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, Inject, OnInit } from '@angular/core';
import {UsersComponent} from "../users/users.component";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  userData: any;
  action!: string

  constructor(
    private dialogRef: MatDialogRef<UsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.userData = this.data.data
    this.action = this.data.action
  }

  onClick(type: string): void {
    if(type=='Yes'){
      this.dialogRef.close('Yes');
    }else{
      this.dialogRef.close('No')
    }
  }

}
