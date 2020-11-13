import { UtilService } from './../../../../shared/services/util.service';
import { Component, OnInit } from '@angular/core';
import { AdministracionService } from './administracion.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  public loading: boolean = false;
  public herramientas: any[] = [];


  constructor(private _AdministracionService: AdministracionService, private _UtilService : UtilService) { }

  ngOnInit(): void {
    this.loadHerramientas();
  }

  loadHerramientas(){
    this.loading = true;
    this._AdministracionService.getLista()
     .subscribe(
       (res: any)=>{
         this.herramientas = res;
         console.log(res)
       },
       (error:HttpErrorResponse) => {
             console.log("ha ocurrido un error ");
             console.log("error ",error);
       },
       () => this.loading = false
     )
  }
  goTo(data){
    this._UtilService.goTo(data.url);
  }

}
