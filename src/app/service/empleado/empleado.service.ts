import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8080/api/empleados';

  constructor(private http: HttpClient) { }

  obtenerTodosLosEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getHttpOptions());
  }

  buscarEmpleadoId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  agregarEmpleado(empleado: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, empleado, this.getHttpOptions());
  }

  actualizarEmpleado(id: number, empleado: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, empleado, this.getHttpOptions());
  }

  eliminarEmpleado(id: number): Observable<any> {
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