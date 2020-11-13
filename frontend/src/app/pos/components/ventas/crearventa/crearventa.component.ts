import { ToastService } from './../../../../shared/services/toast.service';
import { Component, OnInit, ViewChild, Directive, Input, Host } from '@angular/core';
import { NgForOf } from '@angular/common';
import { BgtableComponent } from './../../../../shared/components/bgtable/bgtable.component';
import { environment } from 'src/environments/environment';
import { UtilService } from './../../../../shared/services/util.service';
import { VentasService } from './../ventas.service';
import { BarcodeComponent } from './../../../../shared/components/barcode/barcode.component';

@Component({
  selector: 'app-crearventa',
  templateUrl: './crearventa.component.html',
  styleUrls: ['./crearventa.component.css']
})
export class CrearventaComponent implements OnInit {
  @ViewChild(BgtableComponent) dataTableReload: BgtableComponent;
  active = 1; /*default active read for barcode */
  buttons =  {
    acciones: {
      'copy': true
      },
    exports: [],
  };
  columns = [
    /*{
      title : 'Imagen',
      data:'imagen',
      type:'imagen',
      width_img:'60',
      orderable: false,
      searchable:false
    },*/
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
      title : 'Precio Venta',
      data  : 'precio_venta',
      pipe : 'currency',
      orderable: true,
      searchable:false,
      type:'text',
    },     
    {
      title : 'Stock',
      data  : 'stock',
      orderable: true,
      searchable:false,
      type:'text',
    }

  ]; 
  
  tableConfig = {
    buttons: this.buttons,
    listado_seleccion : true,
    columns : this.columns,
    url     : environment.apiUrl+'/pos/productoslist',
    globalSearch: true,
    rowSearch:false,
    advancedSearch: true,
    paginatorPosition: 'bottom',
    customFilters: [
    ]
  }
  urlCompleteClientes = environment.apiUrl+'/pos/clienteslist';
  
  ventaDetalles = this.initVentaDetalles()

  listaRecibos: any[] = [];
  total :number = 0;
  ngForTrackByField = 'posicion';
  loading:boolean;
  constructor(private _UtilService:UtilService, private _VentasService : VentasService, private _ToastService: ToastService) { 
    this.loading = false
  }

  ngOnInit() {
    let testing = this.initVentaDetalles()
    console.log("el testing ",testing);
  }
  clienteSeleccionado(data){
    console.log("el cliente seleccionado ",data)
  }
  initVentaDetalles(){
    let ventaDetalles = {
      productosVenta : [],
      total : 0,
      subtotal: 0,
      impuesto: 0,
      totalItems:0,
      posicion:0,
      tiempo:'',
      metodo_pago:''
    } 
    return ventaDetalles
  }
  getCurrentTime(){
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();  
    return time;  
  }
  findItemInArray(data){
    let search = this.ventaDetalles.productosVenta.findIndex(item=> item.id === data.id);
    return search;
  }
  insertFirstProduct(data){
    data.cantidad = 1;
    data.tiempo = this.getCurrentTime()
    this.ventaDetalles.productosVenta.unshift(data);
  }
  updateQuantityProduct(data, index){
    let cantidadActual = this.ventaDetalles.productosVenta[index].cantidad;
    let nuevaCantidad  = (this.ventaDetalles.productosVenta[index].cantidad*1) + 1
    
    let cantidadInsertar = nuevaCantidad > data.stock ? data.stock : nuevaCantidad;
    this.ventaDetalles.productosVenta[index].cantidad = cantidadInsertar;
  }
  insertNewProduct(data){
    data.cantidad = 1;
    this.ventaDetalles.productosVenta.unshift(data); 
  }
  addProducto(data){
    let getIndexProducto = this.findItemInArray(data);
    getIndexProducto >= 0 ? this.updateQuantityProduct(data, getIndexProducto): this.insertNewProduct(data)  
  }
 copiar(data){ console.log("date en copiar ",data)
  this.ventaDetalles.productosVenta.length ? this.addProducto(data) : this.insertFirstProduct(data);
  this.calcularTotal()
 }
 verificarCantidad(data){ console.log("al modificar cantidad ",data);
  let index = this.findItemInArray(data);
  if(this.ventaDetalles.productosVenta[index].cantidad > this.ventaDetalles.productosVenta[index].stock ){
    this.ventaDetalles.productosVenta[index].cantidad = this.ventaDetalles.productosVenta[index].stock;
  }
  this.calcularTotal()
 }
 
 calcularTotal(data?:null){
  this.ventaDetalles.total = 0;
  this.ventaDetalles.totalItems = 0;
  this.ventaDetalles.productosVenta.map(item => {
    this.ventaDetalles.total += item.precio_venta * item.cantidad; 
    this.ventaDetalles.totalItems += item.cantidad;
  })
 }

 removeItem(data){
  this.ventaDetalles.productosVenta = this.ventaDetalles.productosVenta.filter(obj => obj['id'] !== data['id']);
  this.calcularTotal()
 }

 nuevoRecibo(){
   console.log("la venta detalle ", this.ventaDetalles);
  if(!this.ventaDetalles.productosVenta.length) return; 
  this.ventaDetalles.tiempo = this.getCurrentTime();
  let posicion = 0;
  if(this.listaRecibos.length == 0){ 
    console.log("entra manuelf uno")
    posicion = 1;
  }else{
    if(this.ventaDetalles.posicion==0){
      posicion = this.listaRecibos.length + 1
      console.log("entra manuelf dos")
    }else{
      posicion = this.ventaDetalles.posicion;
      console.log("entra manuelf tres")
    }
  }
  this.ventaDetalles.posicion = posicion;
  //this.ventaDetalles.posicion = this.listaRecibos.length == 0 ? 1 : this.listaRecibos.length+1;
  console.log("el tamaño ",this.listaRecibos.length);
  
  this.listaRecibos.push(this.ventaDetalles);
  this.sortListaRecibos('posicion')
  this.ventaDetalles = this.initVentaDetalles()
 }
 eliminarRecibo(){
  this._UtilService.confirm({ title:'Eliminar Registro', message: 'Seguro que desea eliminar estos datos?' }).then(
    () => {
      this.ventaDetalles = this.initVentaDetalles()
    },
    () => {
    });   
 }
 verReciboLista(){

 }
 pago(){
  this._UtilService.confirm({ title:'Generar Venta', message: 'Seguro que desea generar esta venta?' }).then(
    () => {
      this._VentasService.guardar(this.ventaDetalles)
      .subscribe(
        (result:any)=>{
          if(result['code']==200){
            this._ToastService.success(result.msg+' Correctamente');
          }
        },
        (error)=>{
          console.log("el error fue ",error);
          this._ToastService.danger(error);
        }
      )
    },
    () => {
      //console.log('action cancel...');
    });
 }
 volver(data){
  /*console.log("en volver",data.posicion);
  console.log("el tamaño ",this.listaRecibos.length);
  console.log("el tatodo  ",this.listaRecibos);*/
  this.listaRecibos = this.listaRecibos.filter(obj => obj['posicion'] !== data['posicion'])
  if(this.ventaDetalles.productosVenta.length){ this.listaRecibos.push(this.ventaDetalles); this.sortListaRecibos('posicion')}
  this.ventaDetalles = data;
  console.log("el valor de las ventas ",this.listaRecibos);    
 }
 sortListaRecibos(prop: string){
  this.listaRecibos.sort((a:any, b:any)=>{
    if (a[prop] > b[prop]) { return 1; }
    if (a[prop] < b[prop]) {return -1;}
    // a must be equal to b
    return 0;
  })
 } 
}