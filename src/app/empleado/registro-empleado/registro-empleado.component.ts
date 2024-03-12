import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadoService } from '../../service/empleado/empleado.service';

@Component({
    selector: 'app-registro-empleado',
    templateUrl: './registro-empleado.component.html',
    styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent implements OnInit {

    titulo = 'Agregar empleado';
    formEmpleado: FormGroup;
    id: any | null;
    botonGuardar: boolean = true;
    errorMessage: string | null = null;


    constructor(
        private fb: FormBuilder,
        private empleadoService: EmpleadoService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.formEmpleado = this.fb.group({
            nombreEmpleado: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
            apPaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
            apMaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
            curp: ['', [Validators.required, Validators.minLength(18)]]
        });

        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.esEditar();
    }

    esEditar() {
        if (this.id !== null) {
            this.titulo = 'Editar empleado';
            this.empleadoService.buscarEmpleadoId(this.id).subscribe(response => {
                this.formEmpleado.patchValue(response);
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
        this.empleadoService.agregarEmpleado(this.formEmpleado.value).subscribe(
            response => {
                this.router.navigate(['/empleado/listado-empleado']);
            },
            error => {
                console.error(error);
                this.errorMessage = 'Ya existe un empleado con la CURP proporcionada';  // Utiliza el mensaje de error proporcionado o un mensaje predeterminado
            }
        );
    }
    editar(id: any): void {
        const empleado: any = this.formEmpleado.value;
        this.empleadoService.actualizarEmpleado(id, empleado).subscribe(
            response => {
                this.router.navigate(['/empleado/listado-empleado']);
            },
            error => {
                console.error(error);
            }
        );
    }

    onInputNombre(event: any) {
        const inputValue = event.target.value;
        const newValue = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        this.formEmpleado.get('nombreEmpleado')?.setValue(newValue, { emitEvent: false });
    }

    onInputApP(event: any) {
        const inputValue = event.target.value;
        const newValue = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        this.formEmpleado.get('apPaterno')?.setValue(newValue, { emitEvent: false });
    }

    onInputApM(event: any) {
        const inputValue = event.target.value;
        const newValue = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        this.formEmpleado.get('apMaterno')?.setValue(newValue, { emitEvent: false });
    }

    onInputCurp(event: any) {
        const inputValue = event.target.value;
        // Limita la longitud a 18 caracteres
        const truncatedValue = inputValue.slice(0, 18);
        const newValue = truncatedValue.toUpperCase();
        this.formEmpleado.get('curp')?.setValue(newValue, { emitEvent: false });
    }
    
}
