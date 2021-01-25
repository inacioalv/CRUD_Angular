import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  constructor(private router:Router, private headerService:HeaderService) {
    // Mudar os components
    headerService.headerData={
      title:'Cadastro de Produtos',
      icon:'storefront',
      routeUrl:'/products'
    }
   }

  ngOnInit(): void {
  }

  // Botão para navegar para outra rota
  navigateToProductCreate():void{
    this.router.navigate(['/products/create'])
    
  }

}
