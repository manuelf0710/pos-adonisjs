import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProveedorService } from './../proveedor.service';
import { Proveedor } from './../modelproveedor';
import { ToastService } from './../../../../../shared/services/toast.service';

@Component({
  selector: 'app-new-proveedor',
  templateUrl: './new-proveedor.component.html',
  styleUrls: ['./new-proveedor.component.css']
})
export class NewProveedorComponent implements OnInit {
  @Input() data: Proveedor;
  formulario: FormGroup;
  respuesta = {
    status: 'close',
    data  : []
  }
  regimenes:any[]=[];
  public loading: boolean = false;  
  constructor(private FormBuilder: FormBuilder, 
    public _activeModal: NgbActiveModal,
    private _ToastService: ToastService,
    public _ProveedorService: ProveedorService) { }

  ngOnInit(): void {
    this.dataformulario();
    this.buildForm();
  }
  private buildForm() {
    let id     = null
    let registro = null
    let digito  = null
    let nombre  = null
    let tel  = null
    let web  = null
    let direccion  = null
    let cont1  = null
    let tel1  = null
    let cargo1  = null
    let cont2  = null
    let tel2  = null
    let cargo2  = null
    let comentario  = null
    let estado  = 1
    let correo  = null
    let categoria  = null
    let calificacion  = null
    let favorito  = null
    let convenio  = null
    let ciudad  = null
    let tipo_identidad  = null
    let tipo_persona  = null
    let regimen  = null
    let autoretenedor  = null
    let gcontrib  = null
    let ica  = null
    if(this.data){
      id = this.data.id;
      registro = this.data.registro;
      digito  = this.data.digito;
      nombre  = this.data.nombre;
      tel  = this.data.tel;
      web  = this.data.web;
      direccion  = this.data.direccion;
      cont1  = this.data.cont1;
      tel1  = this.data.tel1;
      cargo1  = this.data.cargo1;
      cont2  = this.data.cont2;
      tel2  = this.data.tel2;
      cargo2  = this.data.cargo2;
      comentario  = this.data.comentario;
      estado  = this.data.estado;
      correo  = this.data.correo;
      categoria  = this.data.categoria;
      calificacion  = this.data.calificacion;
      favorito  = this.data.favorito;
      convenio  = this.data.convenio;
      ciudad  = this.data.ciudad;
      tipo_identidad  = this.data.tipo_identidad;
      tipo_persona  = this.data.tipo_persona;
      regimen  = this.data.regimen;
      autoretenedor  = this.data.autoretenedor;
      gcontrib  = this.data.gcontrib;
      ica  = this.data.ica;
    }
    this.formulario = this.FormBuilder.group({
      id:[id],
      registro: [registro, [Validators.required, Validators.maxLength(30)]],
      digito:[digito],
      nombre:[nombre, [Validators.required, Validators.maxLength(150)]],
      tel:[tel],
      web:[web],
      direccion:[direccion],
      cont1:[cont1],
      tel1:[tel1],
      cargo1:[cargo1],
      cont2:[cont2],
      tel2:[tel2],
      cargo2:[cargo2],
      comentario:[comentario],
      estado:[estado],
      correo:[correo],
      categoria:[categoria],
      calificacion:[calificacion],
      favorito:[favorito],
      convenio:[convenio],
      ciudad:[ciudad],
      tipo_identidad:[tipo_identidad, [Validators.required]],
      tipo_persona:[tipo_persona, [Validators.required]],
      regimen:[regimen],
      autoretenedor:[autoretenedor],
      gcontrib:[gcontrib],
      ica:[ica]
    });
  } 
  dataformulario(){
    this._ProveedorService.dataform()
      .subscribe(
        (data =>{
          this.regimenes = data.regimenes;
          console.log(this.data);
        }),
        (error=>{

        })
      )
  }
  
  closeModal() {
    this._activeModal.close(this.respuesta);
  }  

  guardar(event: Event){
    event.preventDefault();
    if (this.formulario.valid) {
      const value = this.formulario.value;
      this.loading = true;
      this._ProveedorService.guardar(value)
      .subscribe(
        (res: any)=>{
          if(res.status=='ok'){
            this.respuesta = {status: 'ok', data: res};
            this.formulario.get('id').setValue(res.data.id);
            this._ToastService.success('proveedor '+res.msg+' correctamente');
            //this._activeModal.close(this.respuesta);
          }
          if(res.status=='error'){
            let messageError = this._ToastService.errorMessage(res.msg);
             this._ToastService.danger(messageError);
         }          
        },
        (error: any)=>{ console.log("error "+error)},
        ()=> this.loading = false

      )

    } else {
      this.formulario.markAllAsTouched();
    }
    if(this.formulario.valid){
      console.log(this.formulario)
    }    
  }

}
