import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private _http: HttpClient) {}

public guardar(data){
  if(data.id == null){
    return this._http.post<any>(`${environment.apiUrl}/pos/clientes`, data);
  }else{
    return this._http.put<any>(`${environment.apiUrl}/pos/clientes/`+data.id, data);
  }
}
public eliminar(id){
  return this._http.delete<any>(`${environment.apiUrl}/pos/clientes/`+id)
}
}