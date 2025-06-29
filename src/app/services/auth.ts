import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Login, User } from '../shared/interface/login.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);
 
  constructor() { }
 
  login(data: { email: string; password: string }): Observable<Login> {
    return this.http.post<Login>(environment.API_URL + '/auth/login', data).pipe(
      tap(response => {
        // Guardar token y usuario cuando el login sea exitoso
        if (response.access_token) {
          this.setToken(response.access_token);
          this.setUser(response.user);
        }
      })
    );
  }

  register(data: any): Observable<Login> {
    return this.http.post<Login>(environment.API_URL + '/auth/register', data).pipe(
      tap(response => {
        // Guardar token y usuario cuando el login sea exitoso
        if (response.access_token) {
          this.setToken(response.access_token);
          this.setUser(response.user);
        }
      })
    );  
  }

  // Método me() que tu backend espera (POST con Bearer token)
  user(id:any): Observable<User> {
    return this.http.get<User>(environment.API_URL + '/auth/profile/' + id, {});
  }

  logout() {
    localStorage.clear();
  }

  // Métodos auxiliares para manejar token y usuario
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  setUser(user: User): void {
    localStorage.setItem('auth_user', JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}