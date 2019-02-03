import { Category } from '../models/category';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { GlobalConfig } from '../config/global.config';

@Injectable()
export class CategoryService {
    private baseUrl = '';
    private headers: Headers;

    constructor(private http: Http, globalConfig: GlobalConfig) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.baseUrl = globalConfig.apibaseAddress;

        console.log(this.headers.get('Authorization'));
    }

    getAll(): Observable<Category[]> {
        return this.http.get(`${this.baseUrl}/category`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    get(id: number): Observable<Category> {
        return this.http
            .get(`${this.baseUrl}/category/${id}`)
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => Observable.throw('Server error'));
    }
    add(category: Category): Observable<Response> {

        return this.http
            .post(`${this.baseUrl}/category`, JSON.stringify(category), { headers: this.headers })
            .catch((error: any) => Observable.throw('Server error'));
    }
    update(category: Category): Observable<Response> {
        return this.http
            .put(`${this.baseUrl}/category/${category._id}`, JSON.stringify(category), { headers: this.headers })
            .catch((error: any) => Observable.throw('Server error'));
    }
    delete(id: number): Observable<Response> {
        return this.http
            .delete(`${this.baseUrl}/category/${id}`)
            .catch((error: any) => Observable.throw('Server error'));
    }
}
