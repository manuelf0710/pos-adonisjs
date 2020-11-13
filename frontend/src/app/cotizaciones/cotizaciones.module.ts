import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotizacionesRoutingModule } from './cotizaciones-routing.module';
import { CotizacionesListComponent } from './components/cotizaciones-list/cotizaciones-list.component';


@NgModule({
  declarations: [CotizacionesListComponent],
  imports: [
    CommonModule,
    CotizacionesRoutingModule
  ]
})
export class CotizacionesModule { }
