import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BreadcrumbModule} from 'xng-breadcrumb';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule  } from './shared/shared.module';

import { fakeBackendProvider } from './auth/guards/fake-backend';


import { AppRoutingModule } from './app-routing.module';

import { ErrorInterceptor } from './auth/guards/error.interceptor';
import { JwtInterceptor } from './auth/guards/jwt.interceptor';
import { AuthTokenInterceptor } from './auth/services/authtokeninterceptor.service';
//import { RefreshTokenInterceptor } from './auth/guards/refreshtoken.interceptor';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { HeaderComponent } from './template/header/header.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './auth/components/login/login.component';
import { OtroComponent } from './otro/otro.component';
import { HomeComponent } from './home/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    InicioComponent,
    LoginComponent,
    OtroComponent,
    //FilterforPipe,
    HomeComponent,    
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
	  ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    BreadcrumbModule ,
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    
  ],
  providers: [
    NgbActiveModal,
    //CategoriasService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
