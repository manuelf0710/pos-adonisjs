import {  Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation  } from '@angular/core';
import { BgtableComponent } from './../../../../shared/components/bgtable/bgtable.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ImpuestoService } from './impuesto.service';
import { UtilService } from './../../../../shared/services/util.service';
import { ToastService } from './../../../../shared/services/toast.service';
import { NewImpuestoComponent } from './crear/new-impuesto.component';

@Component({
  selector: 'app-impuesto',
  templateUrl: './impuesto.component.html',
  styleUrls: ['./impuesto.component.css']
})
export class ImpuestoComponent implements OnInit {
  @ViewChild(BgtableComponent) dataTableReload: BgtableComponent;

  buttons={
    acciones: {
      'edit': true,
      'delete': true,
      'copy': false,
      'new': true
      },
      exports: [],
  }  

  columns = [
    {
      title : 'Nombre',
      data:'nombre',
      orderable: false,
      searchable:true,
      type:'text',
    },
    {
      title : 'Valor',
      data:'valor',
      orderable: false,
      searchable:false,
      type:'number',
    },    
    ]; 

  tableConfig = {
    buttons: this.buttons,
    listado_seleccion : true,
    columns : this.columns,
    url     : environment.apiUrl+'/pos/impuestoslist',
    globalSearch: true,
    rowSearch:false,
    advancedSearch: false,
    paginatorPosition: 'bottom',
    customFilters: []
  }  

  constructor(private _ImpuestoService: ImpuestoService,
              private modalService: NgbModal, 
              private _ToastService: ToastService,
              private _UtilService:UtilService
              ) { }

  ngOnInit(): void {
  }
  nuevo(evento:Event){
    const modalRef = this.modalService.open(NewImpuestoComponent,{
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

  public editar(impuesto){
    const modalRef = this.modalService.open(NewImpuestoComponent,{
      //backdrop: 'static',
      size: 'lg',
      keyboard: false
  });
  
  modalRef.componentInstance.data = impuesto; 
  
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
        this._ImpuestoService.eliminar(data.id)
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
