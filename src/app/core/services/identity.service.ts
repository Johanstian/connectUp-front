import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  // baseUrl = 'http://localhost:3000/api';
  baseUrl = '';
  prodUrl = environment.prodUrl + '/user';
  @Output() user: EventEmitter<any> = new EventEmitter();

  private userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  user$: Observable<any> = this.userSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  signIn(request: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + this.prodUrl + '/login', request);
  }

  signUp(request: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl + this.prodUrl + '/create-user', request);
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.value;
  }

  updateUser(user: any) {
    this.userSubject.next(user);
  }

}
