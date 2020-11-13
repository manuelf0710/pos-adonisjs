import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable, throwError } from 'rxjs';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  //public data : Observable<any[]>;
  //public data = [];

  constructor(private _http:HttpClient) { }

  public getCategorias(){
  //return this._http.get(`${environment.apiUrl}/pos/getliscategories`);
    return this._http.get<any>(`${environment.apiUrl}/pos/categorias`)
    .pipe(map(lista => {
       //this.data = lista;
       const retorno = lista.data;
       return retorno;
       //console.log("getslil", lista);
    }));
  }
  public guardarCategoria(data){
    /*return this._http.post<any>(`${environment.apiUrl}/pos/categoriads`,data)
    .pipe(map(lista => {
       const retorno = lista;
       return retorno;
    }));
    */    
    if(data.id == null){
        return this._http.post<any>(`${environment.apiUrl}/pos/categorias`,data);    
      }else{
      return this._http.put<any>(`${environment.apiUrl}/pos/categorias/`+data.id, data);
    }
  }

  eliminar(id) {
    return this._http.delete(`${environment.apiUrl}/pos/categorias/` + id);
  } 
  
}

