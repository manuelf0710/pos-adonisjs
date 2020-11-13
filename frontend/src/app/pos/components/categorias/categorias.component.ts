import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
//import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BgtableComponent } from './../../../shared/components/bgtable/bgtable.component';
import { Categoria } from './modelcategoria';

import { CategoriasService } from './categorias.service';
import { NewcategoriaComponent } from './crear/newcategoria.component';
import { environment } from './../../../../environments/environment';
import { UtilService } from './../../../shared/services/util.service';
import { ToastService } from './../../../shared/services/toast.service';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriasComponent implements OnInit {
  //public categorias : Observable<Categoria[]>;
  @ViewChild(BgtableComponent) dataTableReload: BgtableComponent;
  buttons =  {
    acciones: {
      'edit': true,
      'delete': true,
      'new': true
      },
    exports: [],
  }; 
  columns=[
    {
      title : 'Categoría',
      data:'nombre',
      orderable: true,
      searchable:true,
      type:'text'
    },
  ]  
  public categorias :Categoria[] = [];
  //public categorias:[];
  public loading: boolean;
  public categoriasearch: string = '';

  tableConfig = {
    buttons: this.buttons,
    listado_seleccion : true,
    columns : this.columns,
    url     : environment.apiUrl+'/pos/categoriaslist',
    globalSearch: true,
    rowSearch:false,
    advancedSearch: false,
    paginatorPosition: 'bottom',
  }

  constructor(//private _http: HttpClient,
             private _categoriaService: CategoriasService,
             private modalService: NgbModal,
             private _UtilService: UtilService,
             private _ToastService: ToastService
             
             ) { 
              this.loading = true;  
  }

  ngOnInit() {
    /*this._categoriaService.getCategorias()
    .subscribe(
      res => {
        this.categorias = res;
        console.log("la data en componjente ", res);
      }
    );
    */
  }
  /*
  loadCategorias(){
    this.loading = true;
    this._categoriaService.getCategorias()
     .subscribe(
       (res: Categoria[])=>{
         this.categorias = res;
       },
       (error:HttpErrorResponse) => {
             console.log("ha ocurrido un error ");
             console.log("error ",error);
       },
       () => { 
         this.loading = false 
        }
     )
  }*/
  
 public agregarCategoria(ev){
    const modalRef = this.modalService.open(NewcategoriaComponent,{
      backdrop: 'static',
      size: 'lg',
      keyboard: false
    });
  
    modalRef.result.then((result) => {
      if(result.status == 'ok'){
        this.dataTableReload.reload(result.data.data);
      }
    }).catch((error) => {
    });   
  }

  public editarCategoria(categoria){
    const modalRef = this.modalService.open(NewcategoriaComponent,{
      //backdrop: 'static',
      size: 'lg',
      keyboard: false
  });
  
  modalRef.componentInstance.data = categoria; 
  
  modalRef.result.then((result) => {
    if(result.status == 'ok'){
      this.dataTableReload.reload(result.data.data);
      this._ToastService.success('Registro editado correctamente');
    }
  }).catch((error) => {
  });  
  }
  eliminar(data){
    this._UtilService.confirm({ title:'Eliminar Registro', message: 'Seguro que desea eliminar este registro?' }).then(
      () => {
        //console.log('deleting...');
        this._categoriaService.eliminar(data.id)
        .subscribe(
          (result:any)=>{
            if(result['code']==200){
              this.dataTableReload.reload(result.data);
              this._ToastService.success(result.msg+' Correctamente');
            }
          },
          (error)=>{
            console.log("el error fue ",error);
            
          }
        )
      },
      () => {
        //console.log('not deleting...');
      });
  }

}
