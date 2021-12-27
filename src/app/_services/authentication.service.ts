import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

import { User } from '../_models/user';
import { DataShareService } from './datashare.service';
import { JwtObject } from '../_models/jwt.object';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private dataShareService: DataShareService
    ) {    
    this.currentUserSubject = new BehaviorSubject<User| null>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('api/auth/login', {
      username,
      password
    }, httpOptions);
  }

  logout() {
    // remove user data from local storage for log out
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('token');    
    var emptyUser: User = new User();
    this.currentUserSubject.next(null);
    this.dataShareService.setUserLoggedIn(false);
    this.dataShareService.setCurrentUser(emptyUser);
  }

  setUser(token: string | null){
    if(token) {
      var decoded = jwt_decode<JwtObject>(token);
      var user = new User();
      user.email = decoded.EmailId;
      user.firstName = decoded.FirstName;
      user.lastName = decoded.LastName;
      user.userId = Number(decoded.UserId);
      user.roles = decoded.role;
      user.isAdmin = user.roles.includes("Admin");
      this.currentUserSubject.next(user);
      this.dataShareService.setCurrentUser(user);
      this.dataShareService.setUserLoggedIn(true);
    }
  }
}
