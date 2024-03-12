// registro-venta.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VentaService } from '../../service/venta/venta.service';
import { EmpleadoService } from '../../service/empleado/empleado.service';

@Component({
    selector: 'app-registro-venta',
    templateUrl: './registro-venta.component.html',
    styleUrls: ['./registro-venta.component.css']
})
export class RegistroVentaComponent implements OnInit {

    titulo = 'Agregar Venta';
    formVenta: FormGroup;
    id: any | null;
    empleados: any[] = []; // Esta variable se utiliza para almacenar la lista de empleados

    constructor(
        private fb: FormBuilder,
        private ventaService: VentaService,
        private empleadoService: EmpleadoService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.formVenta = this.fb.group({
            idEmpleado: [null, [Validators.required]],
            // Agrega más campos según sea necesario (fecha, monto, etc.)
        });

        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
      this.obtenerEmpleados();
      this.esEditar();
  }

    obtenerEmpleados() {
        this.empleadoService.obtenerTodosLosEmpleados().subscribe(response => {
            this.empleados = response;
        });
    }

    esEditar() {
      if (this.id !== null) {
          this.titulo = 'Editar Venta';
          this.ventaService.buscarVentaId(this.id).subscribe(response => {
              setTimeout(() => {
                  this.formVenta.patchValue(response);
                  
                  const empleadoSeleccionado = this.empleados.find(empleado => empleado.idEmpleado === response.idEmpleado.idEmpleado);
                  
                  if (empleadoSeleccionado) {
                      this.formVenta.get('idEmpleado')?.setValue(empleadoSeleccionado.idEmpleado);
                  }
              }, 0);
          });
      }
  }

    agregarOEditar(): void {
        if (this.id === null) {
            this.agregar();
        } else {
            this.editar(this.id);
        }
    }

    agregar(): void {
        this.ventaService.agregarVenta(this.formVenta.value).subscribe(
            response => {
                this.router.navigate(['/venta/listado-venta']);
            },
            error => {
                console.error(error);
            }
        );
    }

    editar(id: any): void {
        const venta: any = this.formVenta.value;
        this.ventaService.actualizarVenta(id, venta).subscribe(
            response => {
                this.router.navigate(['/venta/listado-venta']);
            },
            error => {
                console.error(error);
            }
        );
    }
}
