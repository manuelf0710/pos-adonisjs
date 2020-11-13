import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CategoriasService } from './../../categorias/categorias.service';
import { ProductosService } from './../productos.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UtilService } from './../../../../shared/services/util.service';
import { ImpuestoService } from './../../administracion/impuestos/impuesto.service';

import { Producto } from './../modelproducto';
import { environment } from './../../../../../environments/environment';


@Component({
  selector: 'app-newproducto',
  templateUrl: './newproducto.component.html',
  styles: []
})
export class NewproductoComponent implements OnInit {
  public archivoscargados: any[] = [];
  formulario: FormGroup;
  @Input() data: Producto;
  @Input() categorias: [];
  impuestos : any[] = [];
  active = 1;
  public api_url = environment.server_root;
  respuesta = {
    status: 'close',
    data  : []
  }
  public loading: boolean = false;
  public productosPrecio : any[] = [];
  public nuevoRegistroPrecio : any[];
  //categorias = [];
  arraytest = [
    {item:1},
    {item:2},
    {item:3},
    {item:4},
    {item:5},
  ];

  constructor(private FormBuilder: FormBuilder, 
    public _activeModal: NgbActiveModal,
    public _CategoriasService:CategoriasService,
    public _ProductosService: ProductosService,
    private _ToastService :ToastService,
    private _UtilService: UtilService,
    private _ImpuestoService: ImpuestoService,
    ) {
//this.buildForm();
}

initRegistroPrecio(){
  return {
    id:null,
    producto_id : this.formulario.get('id').value,
    nombre: this.formulario.get('nombrenuevo').value,
    porcentaje:this.formulario.get('porcentajenuevo').value,
    created_at: null,
    valor:this.formulario.get('valornuevo').value,
    ganancia:this.formulario.get('ganancianuevo').value
  }
}

  ngOnInit(): void {
    this.buildForm();
    this.loading = true;
     this._CategoriasService.getCategorias().subscribe(
      (res: any) => {
        this.categorias = res
        this.loading = false;
      }
    )
  }

  getArchivos(archivos_upload){ /*archivos subidos, desde fileuploadcomponent */
    this.archivoscargados = archivos_upload;
    console.log("algo paso",  this.archivoscargados);
    this.formulario.get('imagen').setValue(this.archivoscargados[0]['path']);
  }

  private buildForm() {
    let id     = null;
    let categoria_id = null;
    let codigo = null;
    let barras = null;
    let descripcion = null;
    let imagen = null;
    let stock = 1;
    let precio_compra = null;
    let precio_venta = null;
    let porcentaje = 0;
    let impuesto_id = null;
    let precio_ventaimpuesto = null;

    if(this.data){
      id = this.data.id;
      categoria_id = this.data.categoria_id;
      codigo       = this.data.codigo;
      barras       = this.data.barras;
      descripcion  = this.data.descripcion;
      imagen       = this.data.imagen;
      stock        = this.data.stock;
      precio_compra= this.data.precio_compra;
      precio_venta = this.data.precio_venta;
      porcentaje =   this.data.porcentaje;
      impuesto_id =   this.data.impuesto_id;
      precio_ventaimpuesto = this.data.precio_ventaimpuesto;

    }
    this.formulario = this.FormBuilder.group({
      id:[id],
      categoria_id : [categoria_id, [Validators.required]],
      codigo       : [codigo, [Validators.required]],
      barras       : [barras],
      descripcion  : [descripcion, [Validators.required]],
      imagen       : [imagen],
      stock        : [stock,[Validators.required]],
      precio_compra: [precio_compra,[Validators.required]],
      precio_venta : [precio_venta,[Validators.required]],
      porcentaje   : [porcentaje],
      nombrenuevo  : [''],
      porcentajenuevo  : [0],
      valornuevo  : [0],
      ganancianuevo  : [0],
      impuesto_id: [impuesto_id, [Validators.required]],
      precio_ventaimpuesto:[precio_ventaimpuesto]
    });
    if(this.formulario.get('id').value >0){
      this._ProductosService.getListaPrecios(this.formulario.value)
      .subscribe(
        (res:any)=>{
          if(res.length){
            //this.addPropertyValor(res)
            //this.addPropertyGanancia(res);
            this.productosPrecio = res;
          }
        },
        (error:any)=>{

        }
      )
    }
    this._ImpuestoService.getLista()
    .subscribe(
      (res:any)=>{
        this.impuestos = res;
      },
      (error:any)=>{ }
    )
  }  
  addPropertyValor(data){
    let precio_venta = this.formulario.get('precio_venta').value;
    let nuevo = data.map(item=>{
      item.valor = precio_venta > 0 ? (precio_venta)-((precio_venta*item.porcentaje) / 100): 0;
      return item
    })
    this.productosPrecio = nuevo;
  }
  addPropertyGanancia(data){
    let precio_compra = this.formulario.get('precio_compra').value;
    let nuevo = data.map(item=>{
      item.ganancia = precio_compra > 0 ? item.valor - precio_compra: 0;
      return item
    })    
  }

  guardar(event: Event){
    event.preventDefault();
    if(this.archivoscargados.length){
      this.formulario.value.imagen = this.archivoscargados[0].path;
    }
    if (this.formulario.valid) {
      const value = {
             producto:this.formulario.value,
             precioslista: this.productosPrecio
            };
      this.loading = true;
      this._ProductosService.guardar(value)
      .subscribe(
        (res: any)=>{
          if(res.status=='ok'){
            this.respuesta = {status: 'ok', data: res};
            //this._activeModal.close(this.respuesta);
            this.formulario.get('id').setValue(res.data.id);
            this.productosPrecio = res.data.precio_lista;
            this._ToastService.success('Producto '+res.msg+' correctamente');
          }
          if(res.status=='error'){
             let messageError = this._ToastService.errorMessage(res.msg);
              this._ToastService.danger(messageError);
          }

        },
        (error: any)=>{this._ToastService.danger(error)},
        ()=> this.loading = false

      )

    } else {
      this.formulario.markAllAsTouched();
    }
    if(this.formulario.valid){
      
    }
  }
  guardarPrecioProducto(){
    this._UtilService.confirm({ title:'Guardar Precio', message: 'Seguro que desea guardar este precio?' }).then(
      () => {
        this.loading = true;
        this._ProductosService.guardarListaPrecios(this.productosPrecio)
        .subscribe(
          (res:any)=>{
            if(res.length){
              this._ToastService.success("precios almacenados correctamente");
              this.productosPrecio = res;
            }
            this.loading = false
          },
          (error:any)=>{
            this.loading = false;
            this._ToastService.danger(error);
          }
        )    
      },
      () => {
        //console.log('not deleting...');
      });
  }

  eliminarPrecio(data, index){
    this._UtilService.confirm({ title:'Eliminar Precio', message: 'Seguro que desea eliminar este precio?' }).then(
      () => {
        if(data.id == null){
          this.productosPrecio.splice(index, 1)
          this._ToastService.success("precio eliminado correctamente");
          return;
        }
        this.loading = true;
        this._ProductosService.eliminarPrecio(data.id)
        .subscribe(
          (res:any)=>{
            if(res.code == 200){
              this._ToastService.success("precio eliminado correctamente");
              this.filtrarObjeto(res.data)
            }
            this.loading = false
          },
          (error:any)=>{
            this.loading = false;
            this._ToastService.danger(error);
          }
        )    
      },
      () => {
        //console.log('not deleting...');
      });    
  }
  filtrarObjeto(data){
    let nuevo = this.productosPrecio.filter(obj => obj['id'] !== data['id']);
    this.productosPrecio = nuevo;
  }

  calcularPorcentaje(){
    if(this.formulario.get('porcentaje').value >0){
      let ganancia:number = (this.formulario.get('precio_compra').value * this.formulario.get('porcentaje').value)/100;
      let valor = (this.formulario.get('precio_compra').value*1) + ganancia;
      this.formulario.get('precio_venta').setValue(valor);
    }
  }
  calculoPorPrecios(){
    if(this.formulario.get('precio_compra').value > 0){
      let diferencia = this.formulario.get('precio_venta').value - this.formulario.get('precio_compra').value;
      if(diferencia > 0){
        let porcentaje = (diferencia  * 100) / this.formulario.get('precio_compra').value;
        this.formulario.get('porcentaje').setValue(this._UtilService.dosDecimales(porcentaje,2));
      }
    }
    this.calcularPrecioConImpuesto();
  }
calcularPrecioConImpuesto(){
  if(this.formulario.get('precio_venta').value > 0 && this.formulario.get('impuesto_id').value > 0){
    let iva = this.impuestos.find(element => element.id == this.formulario.get('impuesto_id').value);
    let valoriva  = iva.valor | 0;
    let valorconimpuesto = ((this.formulario.get('precio_venta').value * valoriva) / 100) + (this.formulario.get('precio_venta').value*1) ;
    this.formulario.get('precio_ventaimpuesto').setValue(valorconimpuesto);
  }
}
  
  calcularPrecioListaPorPorcentaje(data, cambio){
    let precio_venta = this.formulario.get('precio_venta').value;
    if(precio_venta > 0){
      let search = this.productosPrecio.findIndex(item=> item.id === data.id);
      if(search >= 0){
        let porcentaje = cambio.target.value;
        let valor = precio_venta > 0 ? (precio_venta) - ((precio_venta *  porcentaje) / 100): 0;
        this.productosPrecio[search].valor = valor;
        this.productosPrecio[search].porcentaje = porcentaje;
        this.calcularGanancia(search);
      }
    }
  }
  calcularGanancia(indice){
    let ganancia = this.productosPrecio[indice].valor - this.formulario.get('precio_compra').value;
    this.productosPrecio[indice].ganancia = ganancia;
  }
  calcularListaPrecioPorValor(data, cambio){
    //let nuevo_valor = cambio.target.value.replace(/\s/g, "");
    let nuevo_valor = cambio.target.value;
    let precio_venta = this.formulario.get('precio_venta').value;
    if(precio_venta > 0){
      let search = this.productosPrecio.findIndex(item=> item.id === data.id);
      let diferencia = precio_venta - nuevo_valor;
      if(diferencia >= 0){
        let porcentaje = (diferencia  * 100) / precio_venta;
        this.productosPrecio[search].porcentaje = this._UtilService.dosDecimales(porcentaje,2);
        this.productosPrecio[search].valor = nuevo_valor;
        this.calcularGanancia(search);
      }else{
        this.productosPrecio[search].valor = precio_venta;
        this.productosPrecio[search].porcentaje = 0;
        this.productosPrecio[search].ganancia   = 0;
      }
    }
  }
  cambiarNombrePrecioLista(data, cambio){
    let search = this.productosPrecio.findIndex(item=> item.id === data.id);
    this.productosPrecio[search].nombre = cambio.target.value  }

  valorToNumero(indice){
    this.productosPrecio[indice].valor = this.productosPrecio[indice].valor * 1;
  }
  calcularNuevoAgregarPorPorcentaje(cambio){ /*calculo nuevo por campo porcentaje */
    let precio_venta = this.formulario.get('precio_venta').value;
    //let valor = this.formulario.get('valornuevo').value;
    if(precio_venta > 0){     
        let porcentaje = cambio.target.value;
        let valor = precio_venta > 0 ? (precio_venta) - ((precio_venta *  porcentaje) / 100): 0;
        this.formulario.get('valornuevo').setValue(valor);
        this.formulario.get('porcentajenuevo').setValue(porcentaje); 
        this.calcularGananciaNuevo();
      
    }
  }
  calcularNuevoAgregarPorValor(cambio){
    let nuevo_valor = cambio.target.value;
    let precio_venta = this.formulario.get('precio_venta').value;
    if(precio_venta > 0){
      let diferencia = precio_venta - nuevo_valor;
      if(diferencia >= 0){
        let porcentaje = (diferencia  * 100) / precio_venta;
        this.formulario.get('porcentajenuevo').setValue(this._UtilService.dosDecimales(porcentaje,2))
        this.formulario.get('valornuevo').setValue(nuevo_valor);
        this.calcularGananciaNuevo();
      }else{
        this.formulario.get('valornuevo').setValue(precio_venta)
        this.formulario.get('porcentajenuevo').setValue(0)
        this.formulario.get('ganancianuevo').setValue(0)
      }
    }
  }

  calcularGananciaNuevo(){
    let ganancia =  this.formulario.get('valornuevo').value - this.formulario.get('precio_compra').value;
    this.formulario.get('ganancianuevo').setValue(ganancia); 
  }
  agregarNuevoPrecio(){
    if(this.validarNuevoPrecio() == true){
      this.productosPrecio.length ? this.productosPrecio.unshift(this.initRegistroPrecio()) : this.productosPrecio.push(this.initRegistroPrecio())
      this.resetPrecioNuevo();
    }
  }

  resetPrecioNuevo(){
      this.formulario.get('nombrenuevo').setValue('') ;
      this.formulario.get('porcentajenuevo').setValue(0);
      this.formulario.get('valornuevo').setValue(0);
      this.formulario.get('ganancianuevo').setValue(0);
    }
  validarNuevoPrecio(){
    if(this.formulario.get('nombrenuevo').value == '' || this.formulario.get('porcentajenuevo').value == '' || this.formulario.get('valornuevo').value == ''
      || this.formulario.get('precio_venta').value == null || this.formulario.get('precio_compra').value == null
    ){
      return false;
    }else return true;
  }

  closeModal() {
    this._activeModal.close(this.respuesta);
  }  

}
