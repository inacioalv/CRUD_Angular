import { Product } from './../product-create/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  products:Product

  constructor(private activatedRoute:ActivatedRoute,
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
    this.productService.delete(this.products.id).subscribe( ()=>{
      this.router.navigate(['/products'])
    })
 }

  private view(id:number):void{
    this.productService.readById(id).subscribe(products =>{
      this.products=products
      console.log(products);
      
    })
  }

}
