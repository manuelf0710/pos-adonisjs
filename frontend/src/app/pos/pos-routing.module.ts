import { ReporteventaComponent } from './components/ventas/reporteventa/reporteventa.component';
import { CrearventaComponent } from './components/ventas/crearventa/crearventa.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductosComponent } from './components/productos/productos.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { AuthGuard } from './../auth/guards/auth.guard';

import { CategoriasComponent } from './components/categorias/categorias.component';
import { NewcategoriaComponent } from './components/categorias/crear/newcategoria.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { AdministracionComponent } from './components/administracion/administracion/administracion.component';
import { ImpuestoComponent } from './components/administracion/impuestos/impuesto.component';
import { InventarioComponent } from './components/administracion/inventario/inventario.component';
import { ProveedorComponent } from './components/administracion/proveedor/proveedor.component';



const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      breadcrumb: {
        label:'pos',
        info: {icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'pos' }
      } 
    },
    children: [
      {
        path: '',
        component: IndexComponent,
        canActivate: [AuthGuard],
        //pathMatch: 'full'
        data :{
          breadcrumb: {
            label:'pos',
            info: { icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'pos' }
          }
        }
      },
      {
        path: 'categorias',
        //component: CategoriasComponent,
        canActivate: [AuthGuard],
        data :{
          breadcrumb: {
            label:'categorias',
            info:{ icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'categorias' } 
          }
        },
        children:[
          {
            path: '',
            component: CategoriasComponent,
            canActivate: [AuthGuard],
            data: {
                    breadcrumb: {
                      label: 'Categorias',
                      info:{ icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'Categorias' } 
                    }
                  },
          },
          {
            path: 'show/:id',
            component: NewcategoriaComponent,
            canActivate: [AuthGuard],
            data: {
                    breadcrumb: {
                      label: 'mostrar categoria',
                      info:{ icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'Mostrar Categoria' } 
                    }
                  },
        },                   
        ]       
     },
     {
      path: 'productos',
      component: ProductosComponent,
      canActivate: [AuthGuard],
      data :{
        breadcrumb: {
          label:'productos',
          info:{icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'productos' }
        }  
      }      

     },
     {
      path: 'clientes',
      component: ClientesComponent,
      canActivate: [AuthGuard],
      data :{
        breadcrumb: {
          label:'clientes',
          info:{icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'clientes' }
        }  
      }      

     },
     {
      path: 'ventas',
      //component: VentasComponent,
      canActivate: [AuthGuard],
      data :{
        breadcrumb: {
          label:'ventas',
          info:{icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'ventas' }
        }   
      },
      children:[
        {
          path: '',
          component: VentasComponent,
          canActivate: [AuthGuard],
          data: {
                  breadcrumb: {
                    label: 'ventas',
                    info:{ icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'ventas' } 
                  }
                },
        },
        {
          path: 'crear',
          component: CrearventaComponent,
          canActivate: [AuthGuard],
          data: {
                  breadcrumb: {
                    label: 'crear',
                    info:{ icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'Crear' } 
                  }
                },
      },                
      ]      
     },  
     
     {
      path: 'administracion',
      //component: VentasComponent,
      canActivate: [AuthGuard],
      data :{
        breadcrumb: {
          label:'administracion',
          info:{icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'administracion' }
        }   
      },
      children:[
        {
          path: '',
          component: AdministracionComponent,
          canActivate: [AuthGuard],
          data: {
                  breadcrumb: {
                    label: 'Administracion',
                    info:{ icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'administracion' } 
                  }
                },
        }, 
        {
          path: 'impuestos',
          component: ImpuestoComponent,
          canActivate: [AuthGuard],
          data: {
                  breadcrumb: {
                    label: 'impuestos',
                    info:{ icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'impuestos' } 
                  }
                },
        },                       
        {
          path: 'inventario',
          component: InventarioComponent,
          canActivate: [AuthGuard],
          data: {
                  breadcrumb: {
                    label: 'Inventario',
                    info:{ icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'Inventario' } 
                  }
                },
        },
        {
          path: 'proveedores',
          component: ProveedorComponent,
          canActivate: [AuthGuard],
          data: {
                  breadcrumb: {
                    label: 'Proveedores',
                    info:{ icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'Proveedores' } 
                  }
                },
        },        
      ]      
     },      

     {
      path: 'repventa',
      component: ReporteventaComponent,
      canActivate: [AuthGuard],
      data :{
        breadcrumb: {
          label:'rep. venta',
          info:{icon: 'fa fa-caret-square-o-up', iconType: 'bootstrap', label:'rep.venta' }
        }  
      }      
     },     
    ]    
  }//,
  //{ path: '**', redirectTo: '' }   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule {

 }
