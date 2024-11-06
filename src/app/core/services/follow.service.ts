import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  // baseUrl = environment.url + '/follow';
  baseUrl = '';
  prodUrl = environment.prodUrl + '/follow';

  constructor(private httpClient: HttpClient) {
  }

  getAllFollows() {
    return this.httpClient.get<any>(this.baseUrl + this.prodUrl + '/get-follows')
  }

  follow(followedUserId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    const body = { followed_user: followedUserId }
    return this.httpClient.post<any>(this.baseUrl + this.prodUrl + '/follow', body, { headers })
  }

  unfollow(userId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.delete<any>(this.baseUrl + this.prodUrl + '/unfollow/' + userId, { headers });
  }

  following(userId: any, page: number, limit: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    let params = new HttpParams().set('page', page).set('limit', limit);
    return this.httpClient.get<any>(this.baseUrl + this.prodUrl + '/following/' + userId + '/page', {headers, params})
  }

}
