import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/*services */
import { UtilService } from './../../../shared/services/util.service';
import { ToastService } from './../../../shared/services/toast.service';
import { ClientesService } from './clientes.service';
/*components */
import { NewClienteComponent } from './crear/new-cliente.component';
import { BgtableComponent } from './../../../shared/components/bgtable/bgtable.component';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  @ViewChild(BgtableComponent) dataTableReload: BgtableComponent;
  @ViewChild('testTemplate', { static: true }) testTemplate: TemplateRef<any>;
  @ViewChild('itemTemplate', { static: true }) itemTemplate: TemplateRef<any>;
  public formSearch : Array<object> = [];
  listItem = [];
  buttons =  {
    acciones: {
      'edit': true,
      'delete': true,
      'copy': false,
      'new': true,
      },
    exports: ['excel', 'csv', 'pdf',],
  };
  columns=[
    {
      title : 'Nombre',
      data:'nombre',
      orderable: true,
      searchable:true,
      type:'text'
    },    
    {
      title : 'Documento',
      data:'documento',
      orderable: false,
      searchable:true,
      type:'number'
    },
    {
      title : 'Email',
      data:'email',
      orderable: false,
      searchable:true,
      type:'text'
    },        
    {
      title : 'Telefono',
      data:'telefono',
      orderable: false,
      searchable:false,
      type:'text'
    }, 
    {
      title : 'Dirección',
      data:'direccion',
      orderable: false,
      searchable:false,
      type:'text'
    },          
    {
      title : 'compras',
      data:'compras',
      orderable: false,
      searchable:false,
      type:'number'
    },              
    {
      title : 'Ultima Compra',
      data:'ultima_compra',
      orderable: false,
      searchable:false,
      type:'date'
    },
  ];

  tableConfig = {
    buttons: this.buttons,
    listado_seleccion : true,
    columns : this.columns,
    url     : environment.apiUrl+'/pos/clienteslist',
    globalSearch: false,
    rowSearch:true,
    advancedSearch: true,    
    paginatorPosition: 'bottom',
    customFilters: []
  }  
  constructor(private modalService: NgbModal, private _UtilService: UtilService, private _ClientesService: ClientesService, private _ToastService: ToastService)  {
   }

  ngOnInit() {
    
  }
  redrawTable(data){
    this.dataTableReload.reload(data);
  }

  agregar(evento:any){
    const modalRef = this.modalService.open(NewClienteComponent,{
      backdrop: 'static',
      size: 'xs',
      keyboard: false
    });
  
    modalRef.result.then((result) => {
      if(result.status == 'ok'){
        this.redrawTable(result.data.data);
      }
    }).catch((error) => {
      console.log("error en agregarcliente component ",error)
    });
  }

  public editar(cliente: any){
    const modalRef = this.modalService.open(NewClienteComponent,{
      backdrop: 'static',
      size: 'lg',
      keyboard: false
    });
    modalRef.componentInstance.data = cliente; 
    modalRef.result.then((result) => {
      console.log("el resultado fue  ",result);
     
      if(result.status == 'ok'){
        //this.loadProductos();
        this.redrawTable(result.data.data);
      }
    }).catch((error) => {
    });    

  }

  copiar(data){
    console.log(data);
  }
  eliminar(data){
    this._UtilService.confirm({ title:'Eliminar Registro', message: 'Seguro que desea eliminar este cliente?' }).then(
      () => {
        //console.log('deleting...');
        this._ClientesService.eliminar(data.id)
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
  exportar(data){
    console.log('exportar ',data);
  }

  generarView(data){
    //this.renderTemplate++;
    this.listItem = data;
    console.log("entro intemlist ",this.listItem);
  }

}
