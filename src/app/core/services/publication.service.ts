import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  // baseUrl = environment.url + '/publication';
  baseUrl = '';
  prodUrl = environment.prodUrl + '/publication';
  // prodUrl = '';

  constructor(private httpClient: HttpClient) {

  }

  getAllPublication(page: any, limit: any): Observable<any> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.get<any>(this.baseUrl + this.prodUrl + '/feed/', { params, headers });
  }

  createPublication(text: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró el token de autenticación en localStorage');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const body = {
      text: text
    };
    return this.httpClient.post<any>(this.baseUrl + this.prodUrl + '/create-publication', body, { headers });
  }

  getPublicationById(userId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.get<any>(this.baseUrl + this.prodUrl + '/user-publication/' + userId, { headers })
  }

  deletePublication(id: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.delete<any>(this.baseUrl + this.prodUrl + '/delete-publication/' + id, { headers })
  }

  uploadMedia(publicationId: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file0', file)
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.httpClient.post<any>(this.baseUrl + this.prodUrl + '/upload-media/' + publicationId, formData, { headers })
  }


}
