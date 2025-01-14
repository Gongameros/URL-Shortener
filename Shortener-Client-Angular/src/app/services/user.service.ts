import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUserUrl: string = environment.apiUrl + '/authentication';

  constructor(private http: HttpClient) {}

  deleteUser(username: string): Observable<void> {
    const url = `${this.apiUserUrl}/user/${username}`;
    return this.http.delete<void>(url);
  }
}
