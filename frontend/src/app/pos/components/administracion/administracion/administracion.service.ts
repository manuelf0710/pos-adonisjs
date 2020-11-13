import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  constructor(private _http:HttpClient) { }

  public getLista(){
    return this._http.get<any>(`${environment.apiUrl}/pos/administracionpos`)
    .pipe(map(lista => {
       const retorno = lista;
       return retorno;
    }));
  }
}
