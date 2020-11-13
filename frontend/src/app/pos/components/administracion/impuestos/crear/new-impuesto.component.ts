import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImpuestoService } from './../impuesto.service';
import { Impuesto } from './../modelimpuesto';

@Component({
  selector: 'app-new-impuesto',
  templateUrl: './new-impuesto.component.html',
  styleUrls: ['./new-impuesto.component.css']
})
export class NewImpuestoComponent implements OnInit {
  @Input() data: Impuesto;
  formulario: FormGroup;
  respuesta = {
    status: 'close',
    data  : []
  }
  public loading: boolean = false;  
  constructor(private FormBuilder: FormBuilder, 
    public _activeModal: NgbActiveModal,
    public _ImpuestoService: ImpuestoService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    let id     = null
    let nombre = null
    let valor  = null
    if(this.data){
      id = this.data.id;
      nombre = this.data.nombre;
      valor  = this.data.valor;
    }
    this.formulario = this.FormBuilder.group({
      id:[id],
      nombre: [nombre, [Validators.required, Validators.maxLength(100)]],
      valor:[valor, [Validators.required]]
    });
  }  

  guardar(event: Event){
    event.preventDefault();
    if (this.formulario.valid) {
      const value = this.formulario.value;
      this.loading = true;
      this._ImpuestoService.guardar(value)
      .subscribe(
        (res: any)=>{
          this.respuesta = {status: 'ok', data: res};
          this._activeModal.close(this.respuesta);
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

  closeModal() {
    this._activeModal.close(this.respuesta);
  }  

}
