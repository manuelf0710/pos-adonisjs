import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BgtableComponent } from './../../../../shared/components/bgtable/bgtable.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProveedorService } from './proveedor.service';
import { UtilService } from './../../../../shared/services/util.service';
import { environment } from './../../../../../environments/environment';
import { NewProveedorComponent } from './crear/new-proveedor.component';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  @ViewChild(BgtableComponent) dataTableReload: BgtableComponent;  
  public loading: boolean = false;
  buttons =  {
    acciones: {
      'new' : true,
      'edit':true,
      'delete':true,
      },
    exports: [],
  };
  columns = [
      {
        title : 'Identificación',
        data:'registro',
        orderable: false,
        searchable:true,
        type:'text',
      },
      {
        title : 'Nombre',
        data:'nombre',
        orderable: false,
        searchable:true,
        type:'text',
      },      
  ];
  tableConfig = {
    buttons: this.buttons,
    listado_seleccion : true,
    columns : this.columns,
    url     : environment.apiUrl+'/pos/proveedoreslist',
    globalSearch: true,
    rowSearch:false,
    advancedSearch: false,
    paginatorPosition: 'both',
    customFilters: [
    ]
  } 
  constructor(private _ProveedorService: ProveedorService,
              private modalService: NgbModal, 
              private _ToastService: ToastService,
              private _UtilService:UtilService
    ) { }

  ngOnInit(): void {
  }

  nuevo(evento:Event){
    const modalRef = this.modalService.open(NewProveedorComponent,{
      backdrop: 'static',
      size: 'xl',
      keyboard: false,
      windowClass:'fullsize-modal'
    });
  
    modalRef.result.then((result) => {
      if(result.status == 'ok'){
        this.dataTableReload.reload(result.data.data);
      }
    }).catch((error) => {
    }); 
  }

  public editar(data){
    const modalRef = this.modalService.open(NewProveedorComponent,{
      //backdrop: 'static',
      size: 'xl',
      keyboard: false,
      windowClass:'fullsize-modal'
  });
  
  modalRef.componentInstance.data = data; 
  
  modalRef.result.then((result) => {
    if(result.status == 'ok'){
      this.dataTableReload.reload(result.data.data);
      //this._ToastService.success('Registro editado correctamente');
    }
  }).catch((error) => {
  });  
  }
  eliminar(data){
    this._UtilService.confirm({ title:'Eliminar Registro', message: 'Seguro que desea eliminar este registro?' }).then(
      () => {
        //console.log('deleting...');
        this._ProveedorService.eliminar(data.id)
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