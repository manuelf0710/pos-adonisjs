import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private _http:HttpClient) { }

  public getLista(){
      return this._http.get<any>(`${environment.apiUrl}/pos/productos`)
      .pipe(map(lista => {
         const retorno = lista.data;
         return retorno;
      }));
    }
    public getListaPrecios(data){
      if(data.id==null){
        return this._http.post<any>(`${environment.apiUrl}/pos/productosPrecios`,data)
      }else{
        return this._http.get<any>(`${environment.apiUrl}/pos/productosPrecios/`+data.id)
      }
    }
    public guardarListaPrecios(data) {
      return this._http.post<any>(`${environment.apiUrl}/pos/productosPrecios`,data)
    }
    public guardar(data){  
      if(data.producto.id == null){
          return this._http.post<any>(`${environment.apiUrl}/pos/productos`,data);    
        }else{
        return this._http.put<any>(`${environment.apiUrl}/pos/productos/`+data.producto.id, data);
        }     
  }
  eliminar(id) {
    return this._http.delete<any>(`${environment.apiUrl}/pos/productos/` + id);
  }
  eliminarPrecio(id) {
    return this._http.delete<any>(`${environment.apiUrl}/pos/productosPrecios/` + id);
  } 
  getProductByBarcode(codigo){
    return this._http.get<any>(`${environment.apiUrl}/pos/productos/barras/`+codigo);
  }  
}  
