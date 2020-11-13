import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BgtableComponent } from './../../../shared/components/bgtable/bgtable.component';
//services
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService } from './productos.service';
import { CategoriasService } from './../categorias/categorias.service';
import { UtilService } from './../../../shared/services/util.service';
import { ToastService } from './../../../shared/services/toast.service';
//models
import { Producto } from './modelproducto';

import { environment } from './../../../../environments/environment';
import { NewproductoComponent } from './crear/newproducto.component';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  @ViewChild(BgtableComponent) dataTableReload: BgtableComponent;
  categorias: any = [];
  buttons={
    acciones: {
      'edit': true,
      'delete': true,
      'copy': false,
      'new': true
      },
      exports: [],
  }
  //columns=['#','acciones','imagen','codigo','descripcion','categoria','stock','precio compra','precio venta','agregado'];
  columns = [
    {
      title : 'Imagen',
      data:'imagen',
      type:'imagen',
      width_img:'60',
      orderable: false,
      searchable:false
    },
    {
      title : 'Código',
      data:'codigo',
      orderable: false,
      searchable:true,
      type:'text',
    },
    {
      title : 'Descripción',
      data:'descripcion',
      orderable: true,
      searchable:true,
      type:'text',
    },
    {
      title : 'Categoría',
      data:'categoria.nombre',
      orderable:true,
      searchable:false,
      type:'text',
    },    
    {
      title : 'Stock',
      data  : 'stock',
      orderable: true,
      searchable:false,
      type:'text',
    },
    {
      title : 'Precio Venta',
      data  : 'precio_venta',
      pipe : 'currency',
      orderable: true,
      searchable:false,
      type:'text',
    },     
    {
      title : 'Precio Compra',
      data  : 'precio_compra',
      pipe: 'currency',
      orderable: true,
      searchable:false,
      type:'text',
    },     

  ];


  tableConfig = {
    buttons: this.buttons,
    listado_seleccion : true,
    columns : this.columns,
    url     : environment.apiUrl+'/pos/productoslist',
    globalSearch: false,
    rowSearch:false,
    advancedSearch: true,
    paginatorPosition: 'bottom',
    customFilters: []
  }

  customFilters: any = [];  

  public productos :Producto[] = [];
  public loading: boolean = true;
  public productosearch: string = '';
  public api_url = environment.server_root;

  constructor(
    private _http: HttpClient,
    private _ProductosService:ProductosService,
    private modalService: NgbModal,
    private _CategoriasService: CategoriasService,
    private _UtilService: UtilService,
    private _ToastService: ToastService
    ) { }

  ngOnInit() {
   //this.loadProductos();
   this._CategoriasService.getCategorias()
    .subscribe(result =>{
      console.log(result);
     this.loading =false;
     this.categorias = this.nuevoArreglo(result,'id','nombre');
     this.customFilters.push({
      title:"Categoría",
      value: '',
      key: 'categoria',
      type: 'select',
      options: this.categorias
    }
    );
    })
  }

  redrawDatatable(reload){
   
  }
  nuevoArreglo(origen, val, lab){
   let nuevo  = [];
    nuevo = origen.map(item=>{
      return { value: item[val], label:  item[lab] };
    });
    return nuevo;
  }

/*
  loadProductos(){
    this.loading = true;
    this._ProductosService.getLista()
     .subscribe(
       (res: Producto[])=>{
         this.productos = res;
       },
       (error:HttpErrorResponse) => {
             console.log("ha ocurrido un error ");
             console.log("error ",error);
       },
       () => this.loading = false
     )
  }
 */ 
  public agregarProducto(some){
    const modalRef = this.modalService.open(NewproductoComponent,{
      backdrop: 'static',
      size: 'lg',
      keyboard: false
    });
    //modalRef.componentInstance.categorias = this.categorias;  
    modalRef.result.then((result) => {
      if(result.status == 'ok'){
        //this.loadProductos();
        this.dataTableReload.reload(result.data.data);
      }
    }).catch((error) => {
    });
  }

  public editarProducto(producto: any){
    const modalRef = this.modalService.open(NewproductoComponent,{
      backdrop: 'static',
      size: 'lg',
      keyboard: false
    });
    console.log("el producto original ", producto)
    modalRef.componentInstance.data = producto;
    //modalRef.componentInstance.categorias = this.categorias; 
    modalRef.result.then((result) => {
      console.log("el resultado fue  ",result);
     
      if(result.status == 'ok'){
        //this.loadProductos();
        console.log("el resultado manuelf",result.data.data);
        this.dataTableReload.reload(result.data.data);
      }
    }).catch((error) => {
    });
  }
  eliminar(data){
    this._UtilService.confirm({ title:'Eliminar Registro', message: 'Seguro que desea eliminar este registro?' }).then(
      () => {
        //console.log('deleting...');
        this._ProductosService.eliminar(data.id)
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
