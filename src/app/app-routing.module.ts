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

import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AdminGuard]
  },
  // Home
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  // Empleado
  {
    path: 'empleado/listado-empleado',
    component: ListadoEmpleadoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'empleado/registro-empleado',
    component: RegistroEmpleadoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'empleado/registro-empleado/:id',
    component: RegistroEmpleadoComponent,
    canActivate: [AuthGuard]
  },

  // Producto
  {
    path: 'producto/listado-producto',
    component: ListadoProductoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'producto/registro-producto',
    component: RegistroProductoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'producto/registro-producto/:id',
    component: RegistroProductoComponent,
    canActivate: [AuthGuard]
  },

  // Venta
  {
    path: 'venta/listado-venta',
    component: ListadoVentaComponent,
    canActivate: [AuthGuard]
  },
  // Coso de Venta
  {
    path: 'venta/registro-venta',
    component: RegistroVentaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'venta/registro-venta/:id',
    component: RegistroVentaComponent,
    canActivate: [AuthGuard]
  },
  // Coso de Detalle
  {
    path: 'venta/registro-detalle',
    component: RegistroDetalleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'venta/registro-detalle/:id',
    component: RegistroDetalleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
