import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private _http:HttpClient) { }

  public guardar(data){  
    if(data.id == null){
        return this._http.post<any>(`${environment.apiUrl}/pos/ventas`,data);    
      }else{
      return this._http.put<any>(`${environment.apiUrl}/pos/ventas/`+data.id, data);
      }     
}  

  eliminar(id) {
    return this._http.delete<any>(`${environment.apiUrl}/pos/ventas/` + id);
  }  
}
