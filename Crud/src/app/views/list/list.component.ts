import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private headerService:HeaderService,private router:Router) {
                headerService.headerData={
                  title:'Lista Produto',
                  icon:'list',
                  routeUrl:'/list'
                }
               }

  ngOnInit(): void {
  }

  navigateToProductCreate():void{
    this.router.navigate(['/list'])
    
  }

}
