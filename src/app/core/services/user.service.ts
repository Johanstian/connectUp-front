import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // baseUrl = environment.url + '/user';
  baseUrl = '';
  prodUrl = environment.prodUrl + '/user';

  constructor(private httpClient: HttpClient) {

  }

  getAllUsers(page: any, limit: any): Observable<any> {
    const params = new HttpParams().set('page', page).set('limit', limit);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.get<any>(this.baseUrl + this.prodUrl + '/list/', { params, headers });
  }

  updateUser(request: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    })
    return this.httpClient.put<any>(this.baseUrl + this.prodUrl + '/update', request, { headers })
  }

  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('file0', file)
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.httpClient.post<any>(this.baseUrl + this.prodUrl + '/upload-avatar', formData, { headers })
  }

  getAvatar(id: any): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + this.prodUrl + '/avatar/' + id);
  }

  getCounters(userId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.httpClient.get<any>(this.baseUrl + this.prodUrl + '/counters/' + userId, { headers });
  }


}
