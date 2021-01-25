import { Router } from '@angular/router';
import { configParams } from './configParams';
import { Product } from './../product-create/product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { HeaderService } from '../../template/header/header.service';

@Component({
  selector: 'app-list-on-scroll',
  templateUrl: './list-on-scroll.component.html',
  styleUrls: ['./list-on-scroll.component.css']
})
export class ListOnScrollComponent implements OnInit {

  items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

  //readonly semFoto ='https://triunfo.pe.gov.br/pm_tr430/wp-content/uploads/2018/03/sem-foto.jpg'

  config: configParams ={
    page:0,
    limit:4,
    name:'',
    //campo:
  };

  products:Product[]=[]
  filtroList:FormGroup;

  // readonly limit=4;
  // page=0;
  // name:string

  constructor(private productService:ProductService,
              private fb: FormBuilder,
              private router:Router,
             ) { 
                

              }

  ngOnInit(): void {
    this.filtroList= this.fb.group({
      name:[] 
    })

    this.filtroList.get('name').valueChanges
    .pipe(debounceTime(400))
    .subscribe((val:string)=>{
      this.config.name=val
      this.resetarConsulta()
      
    })

    this.listPage()
  }
  

  onScroll():void{
    this.listPage()
    
  }

  listPage():void{
    this.config.page++;
    this.productService.readPage(this.config).subscribe(products =>{
      this.products.push(...products)
      console.log(products);
      
    })
  }

  private resetarConsulta():void{
    this.config.page=0,
    this.products=[],
    this.listPage();
  }

  abrir(id:number){
    this.router.navigate(['/products'+id])
  }



}
