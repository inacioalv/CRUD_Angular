import { configParams } from './list-on-scroll/configParams';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from './product-create/product.model';
import { catchError, map } from 'rxjs/operators'
import { ConfigParamsService } from './config-params.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = "http://localhost:3001/products"
  constructor(private snackBar: MatSnackBar,
              private http: HttpClient,
              private configParamsService:ConfigParamsService) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseURL, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseURL).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readPage(config:configParams): Observable<Product[]> {
    const configParams = this.configParamsService.configurarParametros(config)
    return this.http.get<Product[]>(this.baseURL,{params:configParams}).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
  
  readById(id: number): Observable<Product> {
    const url = `${this.baseURL}/${id}`
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
  
  update(product: Product): Observable<Product> {
    const url = `${this.baseURL}/${product.id}`
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
  
  delete(id: number): Observable<Product> {
    const url = `${this.baseURL}/${id}`
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
  
  errorHandler(e: any): Observable<any> {
    this.showMessage("Não consequimos salvar, favor tentar novamente mais tarde!", true)
    return EMPTY
  }

}
