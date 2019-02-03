import { Injectable } from '@angular/core';
import { Http, Response, Headers, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { GlobalConfig } from '../config/global.config';
import { User } from '../models/user';
import { Login } from '../models/login';

declare const sessionStorage: any;

@Injectable()
export class AuthService {
  private baseUrl = '';
  private headers: Headers;
  user: User;
  constructor(private http: Http, globalConfig: GlobalConfig) {
    this.baseUrl = globalConfig.apibaseAddress;
    this.headers = new Headers({ 'Content-Type': 'application/json' });

    this.user = new User();

    if (sessionStorage['authInfo'] != 'null' && sessionStorage['authInfo'] != undefined
      && sessionStorage['authInfo'] != "") {
      this.user = JSON.parse(sessionStorage['authInfo']);
    }
  }

  setAuthorizationHeader() {
    if (this.user.isAuth) {
      // console.log(this.user.token);
      this.headers.append('Authorization', this.user.token);
    }
  }

  clearAuthorizationHeader() {
    this.headers.delete('Authorization');
  };

  logOut() {
    sessionStorage['authInfo'] = null;
    this.clearAuthorizationHeader();

    this.user.isAuth = false;
    this.user.userName = '';
    this.user.fullName = '';
    this.user.contactNo = '';
    this.user.userId = '';
    this.user.token = '';
  };

  setAuthInfo(data) {
    console.log(data);
    if (data != undefined && data != null) {
      this.user.userName = data.userName;
      this.user.fullName = data.fullName;
      this.user.userId = data.userId;
      this.user.isAuth = true;
      this.user.token = data.token;
      this.user.roles = data.roles;

      sessionStorage['authInfo'] = JSON.stringify(this.user);
      this.setAuthorizationHeader();
    }
  };

  login(user: Login): Observable<Response> {

    return this.http
      .post(`${this.baseUrl}/auth/login`, JSON.stringify(user), { headers: this.headers })
      .catch((error: any) => Observable.throw('Server error'));
  }
  signup(user: User): Observable<Response> {

    return this.http
      .post(`${this.baseUrl}/auth/signup`, JSON.stringify(user), { headers: this.headers })
      .catch((error: any) => Observable.throw('Server error'));
  }
}
