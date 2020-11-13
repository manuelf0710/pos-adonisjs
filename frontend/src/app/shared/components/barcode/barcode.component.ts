import { Component,  OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { ProductosService } from './../../../pos/components/productos/productos.service';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements OnInit {

  @ViewChild('barcodesearch',  { static: true }) barcodesearch: ElementRef; 
  @Input() lengthSize = 1;
  @Output() copiarAction :EventEmitter<Object>;
  formulario: FormGroup;

  constructor(private _ProductosService : ProductosService, 
              private _ToastService : ToastService,
              private FormBuilder: FormBuilder,
              ) {
    this.copiarAction = new EventEmitter();
   }

  ngOnInit(): void {
    //this.listenEvent();
    this.buildForm();
    //this.barcodesearch.nativeElement.focus();
  }
/*
  listenEvent(){
    fromEvent(this.barcodesearch.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      ,filter(res => res.length > this.lengthSize || res.length == 0 )
      ,debounceTime(350)
      ).subscribe((text: string) => {
        this.getProductByBarcode(text);
        this.barcodesearch.nativeElement.value ='';
      });     
  } */
  buildForm(){
    let barras = null;
    this.formulario = this.FormBuilder.group({
      barras       : [barras, [Validators.required]]
    });    

  }

  consultar(evento: Event){
    //this.getProductByBarcode(text);
    //this.barcodesearch.nativeElement.value ='';
    if (this.formulario.valid) {
      //console.log(this.formulario.value.barras);
      this.getProductByBarcode(this.formulario.value.barras);
      this.formulario.get('barras').setValue('');
    }    
  }
  
  getProductByBarcode(text){
    this._ProductosService.getProductByBarcode(text)
    .subscribe(
      (res: any)=>{
       console.log("la respuesta es",res)
       if(res.length > 0){
        this.copiarAction.emit(res[0]);
        this._ToastService.success('Artículo encontrado '+res[0].descripcion, { classname: 'bg-success text-light', delay: 3000 });
       }else{
        this._ToastService.danger('Artículo No encontrado', { classname: 'bg-danger text-light', delay: 3000 });
       }
       

      },
      (error:any) => {

      },
      () => console.log("err")
    )    
  }
  test(){
    this.barcodesearch.nativeElement.focus();
  }

}
