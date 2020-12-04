import { Product } from './product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  baseURL = "http://localhost:3001/products"

  constructor(private snackBar:MatSnackBar,
                     private  httpClient:HttpClient  ) { }


showMessage(msg:string):void{
  this.snackBar.open(msg, 'X' ,{
    duration:3000,
    horizontalPosition:'right',
    verticalPosition:'top'
  })
}

create(product:Product): Observable<Product>{
  return this.httpClient.post<Product>(this.baseURL,product);
}

read(): Observable<Product[]>{
  return this.httpClient.get<Product[]>(this.baseURL)
}

readById(id:number): Observable<Product>{
  const url = `${this.baseURL}/${id}`
  return this.httpClient.get<Product>(url)
}

update(product:Product): Observable<Product>{
  const url = `${this.baseURL}/${product.id}`
 return this.httpClient.put<Product>(url,product)
}

delete(id:number): Observable<Product>{
  const url = `${this.baseURL}/${id}`
  return this.httpClient.delete<Product>(url)
}
}
