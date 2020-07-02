import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';



@Component({
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {


  errorMessage:string;

  constructor( private dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.errorMessage = data.description;
        }

  ngOnInit(): void {}

}
