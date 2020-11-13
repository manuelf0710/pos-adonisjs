import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { debounceTime } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//Services
import { CategoriasService } from './../categorias.service';

import { Categoria } from './../modelcategoria';



@Component({
  selector: 'app-newcategoria',
  templateUrl: './newcategoria.component.html',
  styleUrls: ['./newcategoria.component.css']
})
export class NewcategoriaComponent implements OnInit {
  formulario: FormGroup;
  @Input() data: Categoria;
  /*data = {
    id:400,
    nombre:"campo nombre"
  }*/
  respuesta = {
    status: 'close',
    data  : []
  }
  public loading: boolean = false;

  constructor(private FormBuilder: FormBuilder, 
              public _activeModal: NgbActiveModal,
              public _CategoriasService: CategoriasService
              ) {
    //this.buildForm();
   }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    let id     = null
    let nombre = null
    if(this.data){
      id = this.data.id;
      nombre = this.data.nombre;
    }
    this.formulario = this.FormBuilder.group({
      id:[id],
      nombre: [nombre, [Validators.required, Validators.maxLength(100)]],
    });
    
    /*
    this.formulario.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      console.log(value);
    });
    */
  }

  
  guardar(event: Event){
    event.preventDefault();
    if (this.formulario.valid) {
      const value = this.formulario.value;
      this.loading = true;
      this._CategoriasService.guardarCategoria(value)
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
