// registro-producto.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../service/producto/producto.service';

@Component({
    selector: 'app-registro-producto',
    templateUrl: './registro-producto.component.html',
    styleUrls: ['./registro-producto.component.css']
})
export class RegistroProductoComponent implements OnInit {

    titulo = 'Agregar Producto';
    formProducto: FormGroup;
    id: any | null;

    constructor(
        private fb: FormBuilder,
        private productoService: ProductoService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.formProducto = this.fb.group({
            nombreProducto: ['', [Validators.required]],
            descripcion: ['', [Validators.required]],
            precio: ['', [Validators.required, Validators.min(0)]]
        });

        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.esEditar();
    }

    esEditar() {
        if (this.id !== null) {
            this.titulo = 'Editar Producto';
            this.productoService.buscarProductoId(this.id).subscribe(response => {
                this.formProducto.patchValue(response);
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
        this.productoService.agregarProducto(this.formProducto.value).subscribe(
            response => {
                this.router.navigate(['/producto/listado-producto']);
            },
            error => {
                console.error(error);
            }
        );
    }

    editar(id: any): void {
        const producto: any = this.formProducto.value;
        this.productoService.actualizarProducto(id, producto).subscribe(
            response => {
                this.router.navigate(['/producto/listado-producto']);
            },
            error => {
                console.error(error);
            }
        );
    }

    onInputProducto(event: any) {
        const inputValue = event.target.value;
        const newValue = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        this.formProducto.get('nombreProducto')?.setValue(newValue, { emitEvent: false });
    }

}
