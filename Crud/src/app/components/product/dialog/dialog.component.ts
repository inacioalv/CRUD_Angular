import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dialog } from './dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  dialog ={
  title:'Sucesso!',
  description:'Foi cadastrado com sucesso!',
  btmSucces:'OK',
  btmCancel:'Cancelar',
  corBtn:"primary",
  possuirBtnFechar:false
} as dialog;

  constructor(public dialogRef:MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA)public data: dialog) { }

  ngOnInit(): void {
    if(this.data){
      this.dialog.title=this.data.title || this.dialog.title
      this.dialog.description=this.data.description || this.dialog.description
      this.dialog.btmSucces=this.data.btmSucces || this.dialog.btmSucces
      this.dialog.btmCancel=this.data.btmCancel || this.dialog.btmCancel
      this.dialog.corBtn=this.data.corBtn || this.dialog.corBtn
      this.dialog.possuirBtnFechar=this.data.possuirBtnFechar || this.dialog.possuirBtnFechar
    }
  }

}
