import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VentaService } from '../../service/venta/venta.service';
import { ProductoService } from '../../service/producto/producto.service';

@Component({
    selector: 'app-registro-detalle',
    templateUrl: './registro-detalle.component.html',
    styleUrls: ['./registro-detalle.component.css']
})
export class RegistroDetalleComponent implements OnInit {

    titulo = 'Agregar Detalle de Venta';
    formDetalle: FormGroup;
    id: any | null;
    ventas: any[] = [];
    productos: any[] = [];

    constructor(
        private fb: FormBuilder,
        private ventaService: VentaService,
        private productoService: ProductoService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.formDetalle = this.fb.group({
            folio: [null, [Validators.required]],
            idProducto: [null, [Validators.required]],
            cantidad: [null, [Validators.required, Validators.min(1)]],
        });

        this.id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.obtenerVentas();
        this.obtenerProductos();
        this.esEditar();
    }

    obtenerVentas() {
        this.ventaService.obtenerTodasLasVentas().subscribe(response => {
            this.ventas = response;
        });
    }

    obtenerProductos() {
        this.productoService.obtenerTodosLosProductos().subscribe(response => {
            this.productos = response;
        });
    }

    esEditar() {
        if (this.id !== null) {
            this.titulo = 'Editar Detalle de Venta';
            this.ventaService.buscarDetalleId(this.id).subscribe(response => {
                setTimeout(() => {
                    // Asumimos que response es un objeto que tiene folio, idProducto y cantidad
                    this.formDetalle.patchValue(response);
    
                    // Asegúrate de que estás estableciendo correctamente los valores de los selects
                    const ventaSeleccionada = this.ventas.find(venta => venta.folio === response.folio.folio);
                    const productoSeleccionado = this.productos.find(producto => producto.idProducto === response.idProducto.idProducto);
    
                    if (ventaSeleccionada) {
                        this.formDetalle.get('folio')?.setValue(ventaSeleccionada.folio);
                    }
    
                    if (productoSeleccionado) {
                        this.formDetalle.get('idProducto')?.setValue(productoSeleccionado.idProducto);
                    }
    
                    // Asegúrate de que la cantidad se mantenga
                    this.formDetalle.get('cantidad')?.setValue(response.cantidad);
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
        this.ventaService.agregarDetalle(this.formDetalle.value).subscribe(
            response => {
                this.router.navigate(['/venta/listado-venta']);
            },
            error => {
                console.error(error);
            }
        );
    }

    editar(id: any): void {
        const detalle: any = this.formDetalle.value;
    
        // Asegúrate de actualizar solo los campos necesarios
        this.ventaService.actualizarDetalle(id, detalle).subscribe(
            response => {
                // Actualiza solo los campos necesarios nuevamente
                this.formDetalle.patchValue(response);
                this.router.navigate(['/venta/listado-venta']);
            },
            error => {
                console.error(error);
            }
        );
    }
}
