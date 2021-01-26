import { dialog } from './../dialog/dialog';
import { Product } from './../product-create/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  products:Product

  constructor(public dialog:MatDialog,
              private activatedRoute:ActivatedRoute,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(products =>{
      this.products=products
      console.log(products);
    })
    // this.view( this.activatedRoute.snapshot.params['id']);
  
   
  }

  deleteProduct():void{
    const config ={
      data:{
        title:'Tem certeza que deseja excluir?',
        corBtn:"primary",
        description:'Deseja excluir, clique no botão Ok',
        possuirBtnFechar:true
      } as dialog
    };
    const dialogRef = this.dialog.open(DialogComponent,config)
    dialogRef.afterClosed().subscribe((opcao:boolean)=>{
      if(opcao){
        this.productService.delete(this.products.id).subscribe( ()=>{
          this.router.navigate(['/list'])
        })
        
        }else{
         
        }
      });
 }

  private view(id:number):void{
    this.productService.readById(id).subscribe(products =>{
      this.products=products
      console.log(products);
      
    })
  }

}
