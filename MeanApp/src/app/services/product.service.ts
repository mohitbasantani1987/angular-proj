import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { GlobalConfig } from '../config/global.config';

@Injectable()
export class ProductService {
  private baseUrl = '';
  private headers: any;

  constructor(private http: Http, globalConfig: GlobalConfig) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.baseUrl = globalConfig.apibaseAddress;
  }

  getAll(): Observable<Product[]> {
    return this.http.get(`${this.baseUrl}/product`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  get(id: string): Observable<Product> {
    return this.http
      .get(`${this.baseUrl}/product/${id}`)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw('Server error'));
  }
  add(product: Product): Observable<Response> {

    return this.http
      .post(`${this.baseUrl}/product`, JSON.stringify(product), { headers: this.headers })
      .catch((error: any) => Observable.throw('Server error'));
  }
  update(product: Product): Observable<Response> {
    return this.http
      .put(`${this.baseUrl}/product/${product._id}`, JSON.stringify(product), { headers: this.headers })
      .catch((error: any) => Observable.throw('Server error'));
  }
  delete(id: string): Observable<Response> {
    return this.http
      .delete(`${this.baseUrl}/product/${id}`)
      .map((res: Response) => {
        return res;
      })
      .catch((error: any) => Observable.throw('Server error'));
  }
}
