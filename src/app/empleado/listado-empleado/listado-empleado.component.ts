import { Component } from '@angular/core';
import { EmpleadoService } from '../../service/empleado/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-empleado',
  templateUrl: './listado-empleado.component.html',
  styleUrls: ['./listado-empleado.component.css']
})
export class ListadoEmpleadoComponent {
  empleados: any[] = [];

  constructor(private empleadoService: EmpleadoService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerTodosLosEmpleados();
  }

  obtenerTodosLosEmpleados() {
    this.empleadoService.obtenerTodosLosEmpleados().subscribe(response => {
      this.empleados = response;
    }, error => {
      console.error(error);
    });
  }

  eliminar(empleado: any) {
    const confirmar = confirm(`¿Estás seguro de eliminar el empleado con ID ${empleado.idEmpleado}?`);
    if (confirmar) {
      this.empleadoService.eliminarEmpleado(empleado.idEmpleado).subscribe(response => {
        this.obtenerTodosLosEmpleados();
      }, error => {
        console.error(error);
      });
    }
  }

  editarEmpleado(id: any): void {
    this.router.navigate(['/empleado/registro-empleado', id]);
  }

  agregarEmpleado(): void {
    this.router.navigate(['/empleado/registro-empleado']);
  }
}
