import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const API_URL = "/v1/Login";

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

@Injectable({ providedIn: 'root' })

export class UserService {

    constructor(private http: HttpClient) {}

    getGodContent(): Observable<any> {
        return this.http.get(API_URL, httpOptions);
    }

}