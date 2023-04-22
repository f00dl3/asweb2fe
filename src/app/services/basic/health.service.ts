import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const apiUrl = 'http://localhost:8082/health';

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

export class HealthService {

    constructor(private http: HttpClient) { }

    healthStatus(): Observable<any> {
        return this.http.get(apiUrl, httpOptions);
    }

}