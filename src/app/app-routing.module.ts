import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListadoEmpleadoComponent } from './empleado/listado-empleado/listado-empleado.component';
import { RegistroEmpleadoComponent } from './empleado/registro-empleado/registro-empleado.component';

import { ListadoProductoComponent } from './producto/listado-producto/listado-producto.component';
import { RegistroProductoComponent } from './producto/registro-producto/registro-producto.component';

import { ListadoVentaComponent } from './venta/listado-venta/listado-venta.component';
import { RegistroVentaComponent } from './venta/registro-venta/registro-venta.component';

import { HomeComponent } from './home/home.component';
import { RegistroDetalleComponent } from './venta/registro-detalle/registro-detalle.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'empleado/listado-empleado',
    pathMatch: 'full'
  },

  // Home
  {
    path: 'home',
    component: HomeComponent
  },

  // Empleado
  {
    path: 'empleado/listado-empleado',
    component: ListadoEmpleadoComponent
  },
  {
    path: 'empleado/registro-empleado',
    component: RegistroEmpleadoComponent
  },
  {
    path: 'empleado/registro-empleado/:id',
    component: RegistroEmpleadoComponent
  },

  // Producto
  {
    path: 'producto/listado-producto',
    component: ListadoProductoComponent
  },
  {
    path: 'producto/registro-producto',
    component: RegistroProductoComponent
  },
  {
    path: 'producto/registro-producto/:id',
    component: RegistroProductoComponent
  },

  // Venta
  {
    path: 'venta/listado-venta',
    component: ListadoVentaComponent
  },
  // Coso de Venta
  {
    path: 'venta/registro-venta',
    component: RegistroVentaComponent
  },
  {
    path: 'venta/registro-venta/:id',
    component: RegistroVentaComponent
  },
  // Coso de Detalle
  {
    path: 'venta/registro-detalle',
    component: RegistroDetalleComponent
  },
  {
    path: 'venta/registro-detalle/:id',
    component: RegistroDetalleComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
