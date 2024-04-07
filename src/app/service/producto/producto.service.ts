import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) { }

  obtenerTodosLosProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getHttpOptions());
  }

  buscarProductoId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  agregarProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto, this.getHttpOptions());
  }

  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, producto, this.getHttpOptions());
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
}