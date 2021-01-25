import { ValidationService } from './../validation.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from './product.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { dialog } from '../dialog/dialog';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }
  //Validação
  formularioDeUsuario: FormGroup;

  errorminLength = 'Deve ter minimo 3 carecteres'

  constructor(public validacao: ValidationService,
              private productService: ProductService,
              private router: Router,
              private fb: FormBuilder,
              public dialog:MatDialog) { }



  ngOnInit(): void {
    this.criarFormularioDeUsuario();
    this.enviarDados();
  }



  enviarDados() {
    console.log(this.formularioDeUsuario.value);
  }

  //Validação                 
  get f() { return this.formularioDeUsuario.controls; }

  //Validação
  criarFormularioDeUsuario() {
    this.formularioDeUsuario = this.fb.group({
      name: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)]],

      price: ['', [Validators.required, Validators.max(1000), Validators.min(1)]]
    });
  }

  reiniciarForm():void{
    this.formularioDeUsuario.reset()
  }


  createProduct(): void {
    this.formularioDeUsuario.markAllAsTouched();//so salvar se tiver todos os campos prenchidos corretamente
    this.productService.create(this.product).subscribe(() => { // Metodo subscibe sera chamado quando tiver resposta
      this.productService.showMessage('Produto criado.')
      const config ={
        data:{
          btmSucces:'Ir para a listagem',
          btmCancel:'Cadastrar um novo Intem',
          possuirBtnFechar:true
        } as dialog
      };
      const dialogRef = this.dialog.open(DialogComponent,config);
      dialogRef.afterClosed().subscribe((opcao:boolean)=>{
        if(opcao){
          this.router.navigate(['/products'])
          }else{
            this.reiniciarForm();
          }
        });
        })
      }

  cancel(): void {
    this.router.navigate(['/products'])
  }


  // atributoLegal= "qualquer"

  // fazerAlgo(): void {
  //   console.log(this.atributoLegal); 
  // }

}
