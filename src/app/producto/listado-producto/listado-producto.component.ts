import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../service/producto/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-producto',
  templateUrl: './listado-producto.component.html',
  styleUrls: ['./listado-producto.component.css']
})
export class ListadoProductoComponent implements OnInit {
  productos: any[] = [];

  constructor(private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerTodosLosProductos();
  }

  obtenerTodosLosProductos() {
    this.productoService.obtenerTodosLosProductos().subscribe(response => {
      this.productos = response;
    }, error => {
      console.error(error);
    });
  }

  eliminar(producto: any) {
    const confirmar = confirm(`¿Estás seguro de eliminar el producto con ID ${producto.idProducto}?`);
    if (confirmar) {
      this.productoService.eliminarProducto(producto.idProducto).subscribe(response => {
        this.obtenerTodosLosProductos();
      }, error => {
        console.error(error);
      });
    }
  }

  editarProducto(id: any): void {
    this.router.navigate(['/producto/registro-producto', id]);
  }
}
