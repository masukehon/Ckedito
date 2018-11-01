import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../environments/environment';
// import { Store } from '@ngrx/store';
// import { AppState } from '../types';

// const SERVER_URL = environment.BACK_END_SERVER_URL;
const SERVER_URL = 'http://localhost:4000';


@Injectable()

export class RequestService {
    constructor(private http: Http) { }

    processResponse(response: Promise<Response>) {
        return response.then(res => res.json())
            .catch(error => error.json())
            .then(resJson => {
                if (!resJson.success) {
                    return Promise.reject(resJson);
                }
                return resJson.result;
            });
    }

    get(subUrl: string) {
        const headers = new Headers({ token: localStorage.getItem('token') });
        const response = this.http.get(SERVER_URL + subUrl, { headers }).toPromise();
        return this.processResponse(response);
    }

    post(subUrl: string, body = null) {
        const headers = new Headers({ token: localStorage.getItem('token') });
        const response = this.http.post(SERVER_URL + subUrl, body, { headers }).toPromise();
        return this.processResponse(response);
    }

    put(subUrl: string, body = null) {
        const headers = new Headers({ token: localStorage.getItem('token') });
        const response = this.http.put(SERVER_URL + subUrl, body, { headers }).toPromise();
        return this.processResponse(response);
    }

    delete(subUrl: string) {
        const headers = new Headers({ token: localStorage.getItem('token') });
        const response = this.http.delete(SERVER_URL + subUrl, { headers }).toPromise();
        return this.processResponse(response);
    }
}
