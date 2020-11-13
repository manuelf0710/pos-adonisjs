import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {/* HttpClientModule,*/ HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PosRoutingModule } from './pos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { MaterialModule } from './../material/material.module';

//import { FilterforPipe } from './../global/pipes/filterfor';

//import { UtilService } from './../global/services/util.service';
import { JwtInterceptor } from './../auth/guards/jwt.interceptor';
import { AuthTokenInterceptor } from './../auth/services/authtokeninterceptor.service';
import { ErrorInterceptor } from './../auth/guards/error.interceptor';
import { fakeBackendProvider } from './../auth/guards/fake-backend';

import { IndexComponent } from './components/index/index.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { CrearventaComponent } from './components/ventas/crearventa/crearventa.component';
import { ReporteventaComponent } from './components/ventas/reporteventa/reporteventa.component';

import { CategoriasService } from './components/categorias/categorias.service';
import { NewcategoriaComponent } from './components/categorias/crear/newcategoria.component';
import { NewproductoComponent } from './components/productos/crear/newproducto.component';
import { NewClienteComponent } from './components/clientes/crear/new-cliente.component';
import { ImpuestoComponent } from './components/administracion/impuestos/impuesto.component';
import { AdministracionComponent } from './components/administracion/administracion/administracion.component';
import { NewImpuestoComponent } from './components/administracion/impuestos/crear/new-impuesto.component';
import { InventarioComponent } from './components/administracion/inventario/inventario.component';
import { ProveedorComponent } from './components/administracion/proveedor/proveedor.component';
import { NewProveedorComponent } from './components/administracion/proveedor/crear/new-proveedor.component';
/*import { TableCategoriaComponent } from './components/categorias/table-categoria.component';
import { TablevaluePipe } from './components/categorias/tablevalue.pipe';
import { PaginationComponent } from './components/categorias/pagination.component'; */







@NgModule({
  declarations: [
                IndexComponent, 
                CategoriasComponent, 
                ProductosComponent, 
                ClientesComponent, 
                VentasComponent, 
                CrearventaComponent, 
                ReporteventaComponent, 
                NewcategoriaComponent, 
                NewproductoComponent, NewClienteComponent, ImpuestoComponent, AdministracionComponent, NewImpuestoComponent, InventarioComponent, ProveedorComponent, NewProveedorComponent, 
                /*TableCategoriaComponent, 
                TablevaluePipe, 
                PaginationComponent,*/
              ],
  imports: [
    CommonModule,
    PosRoutingModule,
    NgbModule,
    //HttpClientModule
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    //MaterialModule
    //FilterforPipe
    
  ],
  providers: [
    //UtilService,
    CategoriasService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
],
entryComponents: [
  //LoadingComponent,
],
//schemas: [ CUSTOM_ELEMENTS_SCHEMA ] 
})
export class PosModule { }
