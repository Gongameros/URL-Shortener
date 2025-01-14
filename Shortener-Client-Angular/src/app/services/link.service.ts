import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LinkModel } from '../interfaces/link-model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { LinkCreateRequest } from '../interfaces/link-create-request';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  apiLinkUrl = environment.apiUrl + '/links';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getLinks(): Observable<LinkModel[]> {
    return this.http.get<LinkModel[]>(this.apiLinkUrl);
  }

  getLinksByUsername(): Observable<LinkModel[]> {
    const username = this.authService.getUserDetail()?.name;
    if (!username) {
      return of([]);
    }
    return this.http.get<LinkModel[]>(`${this.apiLinkUrl}/${username}`);
  }

  createLink(originalUrl: string): Observable<LinkModel> {
    const username = this.authService.getUserDetail()?.name;
    const newLink: LinkCreateRequest = {
      originalUrl,
      createdBy: username,
    };

    console.log(newLink);

    return this.http.post<LinkModel>(this.apiLinkUrl, newLink);
  }

  getOriginalUrl(hashUrl: string): Observable<LinkModel> {
    return this.http.get<LinkModel>(`${this.apiLinkUrl}/short/${hashUrl}`);
  }

  deleteLink(linkId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiLinkUrl}/${linkId}`);
  }

  deleteLinksByUsername(username: string): Observable<void> {
    return this.http.delete<void>(`${this.apiLinkUrl}/all/${username}`);
  }
}
