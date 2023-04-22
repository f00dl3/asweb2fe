import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const AUTH_API = '/v1/Login';

const httpOptions = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'text',
            //'Content-Type': 'application/json',
            'rejectUnauthorized': 'false',
            'requestCert': 'false',
            'insecure': 'true',
            'crossDomain': 'true'
        }
    )
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<any> {
        return this.http.post(AUTH_API, {
            username,
            password
        }, httpOptions);
    }

}