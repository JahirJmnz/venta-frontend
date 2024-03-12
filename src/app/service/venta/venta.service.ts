import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'http://localhost:8080/api/ventas';
  private apiUrlDetalleVenta = 'http://localhost:8080/api/detalles-venta';

  constructor(private http: HttpClient) { }

  // Operaciones para Venta

  obtenerTodasLasVentas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  buscarVentaId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  agregarVenta(venta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, venta);
  }

  actualizarVenta(id: number, venta: any): Observable<any> {
    const body = {
      idEmpleado: venta.idEmpleado,
      // Agrega más campos según sea necesario (fecha, monto, etc.)
    };
  
    return this.http.put<any>(`${this.apiUrl}/${id}`, body);
  }
  

  eliminarVenta(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Operaciones para DetalleVenta

  obtenerTodosLosDetalles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlDetalleVenta);
  }

  buscarDetalleId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlDetalleVenta}/${id}`);
  }

  agregarDetalle(detalleVenta: any): Observable<any> {
    return this.http.post<any>(this.apiUrlDetalleVenta, detalleVenta);
  }


  actualizarDetalle(id: number, detalleVenta: any): Observable<any> {
    // Asegúrate de que estás enviando solo los campos necesarios
    const body = {
        folio: detalleVenta.folio,
        idProducto: detalleVenta.idProducto,
        cantidad: detalleVenta.cantidad,
    };

    return this.http.put<any>(`${this.apiUrlDetalleVenta}/${id}`, body);
}
  eliminarDetalle(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlDetalleVenta}/${id}`);
  }
}
