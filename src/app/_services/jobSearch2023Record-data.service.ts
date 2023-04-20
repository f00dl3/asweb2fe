import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, shareReplay } from 'rxjs/operators';
import { retryWithBackoff } from './retrywithbackoff.service';
import { JobSearch2023Record } from '../_entities/jobSearch2023Record';
import { SharedBeans as sb } from '../SharedBeans';

@Injectable({ providedIn: 'root' })

export class JobSearch2023RecordDataService {

    private readonly urlPre: string = sb.apiBaseURL + '/jobApplications2023';
    
    httpOptions = { headers: new HttpHeaders(
        {
            'Content-Type': 'application/json',
            'rejectUnauthorized': 'false',
            'requestCert': 'false',
            'insecure': 'true',
            'crossDomain': 'true'
        }
    )};

    constructor(private http: HttpClient) {}

    getAllJobSearch2023Records() {
        return this.http.get<JobSearch2023Record[]>(this.urlPre).pipe(
            retryWithBackoff(100, 3),
            catchError(() => {
                return EMPTY;
            }),
            shareReplay()
        );
    }

}