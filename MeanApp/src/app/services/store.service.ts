import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { GlobalConfig } from '../config/global.config';
import { Cart } from '../models/cart';

@Injectable()
export class StoreService {
    private baseUrl = '';
    private headers: any;

    constructor(private http: Http, globalConfig: GlobalConfig) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.baseUrl = globalConfig.apibaseAddress;
    }

    saveCart(cart: Cart): Observable<Response> {

        return this.http
            .post(`${this.baseUrl}/store/cart`, JSON.stringify(cart), { headers: this.headers })
            .map((res: Response) => {
                return res.json();
            })
            .catch((error: any) => Observable.throw('Server error'));
    }
}
