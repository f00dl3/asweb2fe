import { Injectable } from "@angular/core";
import { SharedBeans as sb } from "../../SharedBeans";
import { HttpHeaders } from "@angular/common/http";
import { JobSearch2023Record } from "../../_entities/jobSearch2023Record";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, of, tap } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
            'rejectUnauthorized': 'false',
            'requestCert': 'false',
            'insecure': 'true',
            'crossDomain': 'true'
        }
    )
}

@Injectable({ providedIn: 'root' })

export class JobSearch2023Service {

    constructor(private http: HttpClient) {}

    private log(message: string) { console.error(`JobSearch2023Service: ${message}`); }
    private call_GetJobSearch2023Applications = sb.apiBaseURL + "/jobApplications2023";

    getJobSearch2023Applications(): Observable<JobSearch2023Record[]> {
        return this.http.get<JobSearch2023Record[]>(this.call_GetJobSearch2023Applications, httpOptions)
        .pipe(
            tap(_ => this.log(`fetched ${this.call_GetJobSearch2023Applications}`)),
            catchError( this.handleError<JobSearch2023Record[]>('getJobSearch2023Applications', []))
        )
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed ${error.message}`);
            return of(result as T);
        }
    }

}