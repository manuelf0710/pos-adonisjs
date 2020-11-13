import { Component, OnInit, ViewChild } from '@angular/core';
import { BgtableComponent } from './../../../shared/components/bgtable/bgtable.component';
import { environment } from './../../../../environments/environment';
/*services */
import { UtilService } from './../../../shared/services/util.service';
import { ToastService } from './../../../shared/services/toast.service';
import { VentasService } from './ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  @ViewChild(BgtableComponent) dataTableReload: BgtableComponent;
  buttons =  {
    acciones: {
      'edit': true,
      'delete': true,
      'new': true
      },
    exports: [],
  };
  pkey = 'id';
  columns=[
    {
      title : 'Código Factura',
      data:'codigo_factura',
      orderable: true,
      searchable:true,
      type:'number'
    },
    {
      title : 'Cliente',
      data:'cliente.nombre',
      orderable: true,
      searchable:true,
      type:'text'
    },    
    {
      title : 'Vendedor',
      data:'vendedor.name',
      orderable: true,
      searchable:true,
      type:'text'
    },    
    {
      title : 'Comisión',
      data:'comision.name',
      orderable: true,
      searchable:false,
      type:'number'
    },
    {
      title : 'Forma de Pago',
      data:'metodo_pago',
      orderable: true,
      searchable:false,
      type:'text'
    },
    {
      title : 'Neto',
      data:'neto',
      pipe: 'currency',
      orderable: true,
      searchable:false,
      type:'text',
    },
    {
      title : 'Total',
      data:'total',
      pipe: 'currency',
      orderable: true,
      searchable:false,
      type:'text'
    },
    {
      title : 'Fecha',
      data:'created_at',
      orderable: true,
      searchable:false,
      type:'date'
    },
  ] 
  
  tableConfig = {
    buttons: this.buttons,
    listado_seleccion : true,
    columns : this.columns,
    url     : environment.apiUrl+'/pos/ventaslist',
    globalSearch: false,
    rowSearch:false,
    advancedSearch: true,
    paginatorPosition: 'bottom',
    customFilters: [
      {
        title:"Factura Desde",
        value: '',
        key: 'factura_desde',
        type: 'date'
      },
      {
        title:"Factura Hasta",
        value: '',
        key: 'factura_hasta',
        type: 'date'
      },
    ]
  }  
  constructor(private _UtilService: UtilService, private _ToastService: ToastService, private _VentasService: VentasService) { }


  ngOnInit() {
  }

  copiar(data){
    console.log(data);
  }
  exportar(data){
    console.log(data);
  }
  eliminar(data){
    this._UtilService.confirm({ title:'Eliminar Registro', message: 'Seguro que desea eliminar este cliente?' }).then(
      () => {
        //console.log('deleting...');
        this._VentasService.eliminar(data.id)
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
  nuevo(evento){
    this._UtilService.goTo('pos/ventas/crear')
  }

}
