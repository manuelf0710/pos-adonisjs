import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImpuestoService {

  constructor(private _http:HttpClient) { }

  public getLista(){
    return this._http.get<any>(`${environment.apiUrl}/pos/impuestoslist`)
    .pipe(map(lista => {
       const retorno = lista.data;
       return retorno;
    }));
  }
  public guardar(data){ 
    if(data.id == null){
        return this._http.post<any>(`${environment.apiUrl}/pos/impuestos`,data);    
      }else{
      return this._http.put<any>(`${environment.apiUrl}/pos/impuestos/`+data.id, data);
    }
  }
  eliminar(id) {
    return this._http.delete(`${environment.apiUrl}/pos/impuestos/` + id);
  }   
}