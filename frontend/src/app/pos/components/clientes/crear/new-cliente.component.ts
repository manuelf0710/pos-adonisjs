import { Component, OnInit, Input, ViewChild, TemplateRef} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
/**services */
import { ClientesService } from './../clientes.service';
import { ToastService } from './../../../../shared/services/toast.service';

/*models */
import { Cliente } from './../modelcliente';





@Component({
  selector: 'app-new-cliente',
  templateUrl: './new-cliente.component.html',
  styleUrls: ['./new-cliente.component.css']
})
export class NewClienteComponent implements OnInit {
  public archivoscargados: any[] = [];
  formulario: FormGroup;
  @Input() data: Cliente;
  respuesta = {
    status: 'close',
    data  : []
  } 

  @ViewChild('dangerTpl')
  private dangerTpl: TemplateRef<any>;
  
  public loading: boolean = false;  
    

  constructor(private FormBuilder: FormBuilder, 
    public _activeModal: NgbActiveModal,
    public _ClientesService:ClientesService,
    private _ToastService:ToastService
    ) {
}

  ngOnInit(): void {
    this.buildForm();
  }
  
  buildForm(){
    let id     = null;
    let nombre = null;
    let documento = null;
    let email = null;
    let telefono = null;
    let direccion = null;
    let fecha_nacimiento = null;
    if(this.data){
      id = this.data.id;
      nombre       = this.data.nombre;
      documento    = this.data.documento;
      email        = this.data.email;
      telefono     = this.data.telefono;
      direccion    = this.data.direccion;
      fecha_nacimiento= this.data.fecha_nacimiento;
    }
    this.formulario = this.FormBuilder.group({
      id:[id],
      nombre     :[nombre, [Validators.required]],
      documento  :[documento, [Validators.required]],
      email      :[email],
      telefono   :[telefono],
      direccion  :[direccion],
      fecha_nacimiento  :[fecha_nacimiento],
    })  
  }

  guardar(event: Event){
    event.preventDefault();
    if (this.formulario.valid) {
      const value = this.formulario.value;
      this.loading = true;
      this._ClientesService.guardar(value)
      .subscribe(
        (res:any) => {
          if(res.status=='ok'){
            this.respuesta = {status: 'ok', data:res}
            this._activeModal.close(this.respuesta);
            this._ToastService.success('Cliente '+res.msg+' correctamente');
          }
          if(res.status=='error'){
            if(res.msg.documento){
             let messageError = this._ToastService.errorMessage(res.msg);
              this._ToastService.danger(messageError);

              //console.log("la template ",this.dangerTpl);
              //this._ToastService.show(this.dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
            }
          }

        },
        (error: HttpErrorResponse) => { 
          console.log("error al guardar cliente "+ error);
          console.log("error al guardar cliente status "+ error.status);
          this.loading = false
        },
        
        () => this.loading = false
       )
      }else{
        this.formulario.markAllAsTouched();
      }
  }

  dateSeleccionado(dato){
    //this.formulario.value.fecha_nacimiento = dato;
    console.log("el dateseleccionado es ",dato);
  }

  closeModal() {
    this._activeModal.close(this.respuesta);
  }  
}