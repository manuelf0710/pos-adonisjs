import { environment } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private _HttpClient: HttpClient) { }

  public getData(){
    return this._HttpClient.get<any>(`${environment.apiUrl}/pos/inventariodata`)
    .pipe(map(data =>{
      const records = data;
      return records;
    }))
  }  
}
