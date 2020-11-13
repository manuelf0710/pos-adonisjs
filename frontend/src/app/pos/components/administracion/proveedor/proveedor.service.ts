import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private _http:HttpClient) { }
  public guardar(data){ 
    if(data.id == null){
        return this._http.post<any>(`${environment.apiUrl}/pos/proveedores`,data);    
      }else{
      return this._http.put<any>(`${environment.apiUrl}/pos/proveedores/`+data.id, data);
    }
  }  
  eliminar(id){
    return this._http.delete(`${environment.apiUrl}/pos/proveedores/` + id);
  }
  public dataform(){
    return this._http.get<any>(`${environment.apiUrl}/pos/dataformproveedor`);
  }
}