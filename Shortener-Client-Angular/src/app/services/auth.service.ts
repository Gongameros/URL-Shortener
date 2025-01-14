import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../interfaces/login-request';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../interfaces/register-request';
import { JWT_CLAIM_CONSTANTS } from '../constants/JwtClaimConstants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUserUrl: string = environment.apiUrl + '/authentication';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUserUrl}/Login`, data).pipe(
      map((response: AuthResponse) => {
        console.log(response);
        localStorage.setItem(this.tokenKey, response.token);
        // Handle successful response
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle error response
        if (error.status === 401) {
          // Unauthorized error
          console.error('Unauthorized access');
        } else if (error.status === 403) {
          console.log('ERROR' + error.status);
          console.error('Wrong Email or Password');
        } else if (error.status === 400) {
          // Bad request error
          console.error('Bad request');
        } else {
          // Other errors
          console.error('An error occurred:', error.message);
        }
        return throwError(() => new Error('Login failed'));
      }),
    );
  }

  register(data: RegisterRequest): Observable<string> {
    return this.http
      .post<string>(`${this.apiUserUrl}/Register?role=user`, data, { responseType: 'text' as 'json' })
      .pipe(
        map((response: string) => {
          console.log('Registration successful:', response);
          return response; // The response is just a string message
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.error('Bad request');
          } else if (error.status === 403) {
            console.error('Conflict: User already exists');
          } else {
            console.error('An error occurred:', error.message);
          }
          return throwError(() => new Error('Registration failed'));
        }),
      );
  }

  logout = (): void => {
    localStorage.removeItem(this.tokenKey);
  };

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  };

  private isTokenExpired = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() > decoded['exp']! * 1000;
    if (isTokenExpired) this.logout();
    return isTokenExpired;
  };

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      name: decodedToken[JWT_CLAIM_CONSTANTS.USERNAME],
      email: decodedToken[JWT_CLAIM_CONSTANTS.EMAIL],
      roles: decodedToken[JWT_CLAIM_CONSTANTS.ROLES],
    };

    return userDetail;
  };

  isUserAdmin = (): boolean => {
    const userDetail = this.getUserDetail();
    if (!userDetail) return false;
    return userDetail.roles.includes('Admin');
  };

  getToken = (): string | null => localStorage.getItem(this.tokenKey) || '';
}
