import { configParams } from './list-on-scroll/configParams';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configurarParametros(config:configParams):HttpParams{
    let httpParams = new HttpParams();
    if(config.page){ httpParams= httpParams.set('_page',config.page.toString())}
    if(config.limit){httpParams= httpParams.set('_limit',config.limit.toString());}
    if(config.name){httpParams= httpParams.set('q',config.name)}
    
    httpParams= httpParams.set('_sort','id');
    httpParams= httpParams.set('_order','desc');
    return httpParams;
  }
}
