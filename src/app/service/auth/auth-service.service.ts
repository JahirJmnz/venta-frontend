import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: {email: string, password: string}): Observable<boolean> {
    return this.http.post<{token: string}>('http://localhost:8080/login', credentials)
      .pipe(
        tap(({token}) => localStorage.setItem('token', token)),
        mapTo(true),
        catchError(error => {
          console.error(error);
          return of(false);
        })
      );
  }

  logout() {
    // Elimina el token del almacenamiento local
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Comprueba si el token es válido
    // ...
    return !!token;
  }
}