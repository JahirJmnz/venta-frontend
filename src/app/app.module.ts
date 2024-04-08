import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistroEmpleadoComponent } from './empleado/registro-empleado/registro-empleado.component';
import { ListadoEmpleadoComponent } from './empleado/listado-empleado/listado-empleado.component';
import { RegistroProductoComponent } from './producto/registro-producto/registro-producto.component';
import { ListadoProductoComponent } from './producto/listado-producto/listado-producto.component';
import { RegistroVentaComponent } from './venta/registro-venta/registro-venta.component';
import { ListadoVentaComponent } from './venta/listado-venta/listado-venta.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroDetalleComponent } from './venta/registro-detalle/registro-detalle.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,

    RegistroEmpleadoComponent,
    ListadoEmpleadoComponent,

    RegistroProductoComponent,
    ListadoProductoComponent,

    RegistroVentaComponent,
    ListadoVentaComponent,
    RegistroDetalleComponent,
    LoginComponent,
    SidebarComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
