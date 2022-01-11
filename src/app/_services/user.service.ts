import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { UserObject } from '../_models/user.object';
import { RoleObject } from '../_models/role.object';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(`/api/Account/CreateUser`, user);
  }

  getAllUsers(): Observable<UserObject[]> {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
    };
    return this.http.get<UserObject[]>(`api/Account/GetAllUsers`, { headers });
  }

  getAllRoles(): Observable<RoleObject[]> {
    return this.http.get<RoleObject[]>(`api/UserRoles/GetAllRoles`);
  }

  createUser(user: any): Observable<UserObject> {
    return this.http.post<UserObject>(`api/Account/CreateUser`, user);
  }
}
