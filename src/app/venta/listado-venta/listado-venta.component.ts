import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../service/venta/venta.service';
import { Router } from '@angular/router';
import { EmpleadoService } from '../../service/empleado/empleado.service';
import { jsPDF } from 'jspdf';



@Component({
  selector: 'app-listado-venta',
  templateUrl: './listado-venta.component.html',
  styleUrls: ['./listado-venta.component.css']
})
export class ListadoVentaComponent implements OnInit {
  ventas: any[] = [];
  detallesVenta: any[] = [];

  constructor(
    private ventaService: VentaService,
    private empleadoService: EmpleadoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.obtenerTodasLasVentas();
    this.obtenerTodosLosDetalles();
  }
  
  // Venta
  obtenerTodasLasVentas() {
    this.ventaService.obtenerTodasLasVentas().subscribe(response => {
      this.ventas = response;
    }, error => {
      console.error(error);
    });
  }



  eliminarVenta(venta: any) {
    const confirmar = confirm(`¿Estás seguro de eliminar la venta con FOLIO ${venta.folio}?`);
    if (confirmar) {
      this.ventaService.eliminarVenta(venta.folio).subscribe(response => {
        this.obtenerTodasLasVentas();
      }, error => {
        console.error(error);
      });
    }
  }

  editarVenta(folio: any): void {
    this.router.navigate(['/venta/registro-venta', folio]);
  }

  // DetalleVenta
  obtenerTodosLosDetalles() {
    this.ventaService.obtenerTodosLosDetalles().subscribe(response => {
      this.detallesVenta = response;
    }, error => {
      console.error(error);
    });
  }

  eliminarDetalle(detalleVenta: any) {
    const confirmar = confirm(`¿Estás seguro de eliminar el detalle de venta con ID ${detalleVenta.idDetalle}?`);
    if (confirmar) {
      this.ventaService.eliminarDetalle(detalleVenta.idDetalle).subscribe(response => {
        this.obtenerTodosLosDetalles();
      }, error => {
        console.error(error);
      });
    }
  }

  editarDetalle(id: any): void {
    this.router.navigate(['/venta/registro-detalle', id]);
  }

  generarPDF(detalleVentaId: number) {
    const detalleVenta = this.detallesVenta.find(detalle => detalle.idDetalle === detalleVentaId);

    const pdf = new jsPDF();

    // Marco con bordes redondeados
    pdf.setDrawColor(0);
    pdf.setFillColor(255, 255, 255);
    pdf.roundedRect(10, 10, 190, 230, 3, 3, 'FD');

    // Título
    pdf.setFontSize(18);
    pdf.text('REPORTE DE VENTA', 70, 20);

    // Línea separadora
    pdf.setLineWidth(0.5);
    pdf.line(10, 25, 200, 25);

    // Empleado
    pdf.setFontSize(14);
    pdf.text(`Empleado: ${detalleVenta.folio.idEmpleado.nombreEmpleado} ${detalleVenta.folio.idEmpleado.apPaterno} ${detalleVenta.folio.idEmpleado.apMaterno}`, 20, 40);

    // CURP del Empleado
    pdf.text(`CURP: ${detalleVenta.folio.idEmpleado.curp}`, 20, 50);

    // Línea separadora
    pdf.line(10, 65, 200, 65);

    // Detalles de la Venta
    pdf.text(`FOLIO Venta: ${detalleVenta.folio.folio}`, 20, 80);
    pdf.text(`Fecha de Venta: ${detalleVenta.folio.fechaVenta}`, 20, 90);

    // Línea separadora
    pdf.line(10, 105, 200, 105);

    // Detalle de Venta
    pdf.text(`Detalle de Venta (ID): ${detalleVenta.idDetalle}`, 20, 120);
    pdf.text(`ID Producto: ${detalleVenta.idProducto.idProducto}`, 20, 130);
    pdf.text(`Nombre Producto: ${detalleVenta.idProducto.nombreProducto}`, 20, 140);
    pdf.text(`Descripción Producto: ${detalleVenta.idProducto.descripcion}`, 20, 150);
    pdf.text(`Cantidad: ${detalleVenta.cantidad}`, 20, 160);

    // Línea separadora
    pdf.line(10, 175, 200, 175);

    // Total
    pdf.text(`Total: $${detalleVenta.folio.monto.toFixed(2)}`, 20, 190);

    // Guardar el PDF
    pdf.save(`DetalleVenta_${detalleVenta.idDetalle}.pdf`);
  }
  
  generarJSON(detalleVentaId: number) {
    const detalleVenta = this.detallesVenta.find(detalle => detalle.idDetalle === detalleVentaId);

    // Convertir el objeto a JSON
    const json = JSON.stringify(detalleVenta, null, 2);

    // Crear un Blob y descargar el archivo
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `DetalleVenta_${detalleVenta.idDetalle}.json`;
    link.click();
  }
}
