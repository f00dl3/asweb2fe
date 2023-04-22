import { Inject, Injectable } from "@angular/core";
import { SortDirection, SortColumnJobSearch2023Record } from "../directives/sortable.directive";
import { JobSearch2023Record } from "../entities/jobSearch2023Record";
import { BehaviorSubject, EMPTY, map, Observable, Subject } from "rxjs";
import { DecimalPipe, formatDate } from "@angular/common";
import { debounceTime, delay, switchMap, tap, catchError, shareReplay, retry } from "rxjs/operators";
import { LiquidCache, LiquidCacheStorageTypes } from "ngx-liquid-cache";
import { retryWithBackoff } from "./retrywithbackoff.service";
import { HttpClient } from "@angular/common/http";
import { SharedBeans as sb } from "../SharedBeans";

interface SearchResult { 
    records: JobSearch2023Record[];
    total: number;
}

interface State {
    page: number,
    pageSize: number;
    searchTerm: string;
    searchByDateStart: string;
    searchByDateEnd: string;
    sortColumn: SortColumnJobSearch2023Record;
    sortDirection: SortDirection;
}

const compare = ( v1: string | number | string[], v2: string | number | string[]) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(records: JobSearch2023Record[], column: SortColumnJobSearch2023Record, direction: string): JobSearch2023Record[] {
    if(direction === '' || column === '') {
        return records;
    } else {
        return [...records].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        })
    }
}

function matches(record: JobSearch2023Record, term: string) {
    try {
        return record.company.toLowerCase().includes(term.toLowerCase()) ||
            record.date.toLowerCase().includes(term.toLowerCase()) ||
            record.position.toLowerCase().includes(term.toLowerCase()) ||
            record.status.toLowerCase().includes(term.toLowerCase());
    } catch (error) {
        return null;
    }
}

@Injectable({ providedIn: 'root' })

export class JobSearch2023RecordService {

    public _loading$ = new BehaviorSubject<boolean>(true);
    public _search$ = new Subject<void>();
    public _records$ = new BehaviorSubject<JobSearch2023Record[]>([]);
    public _total$ = new BehaviorSubject<number>(0);

    private readonly urlPreRecords: string = sb.apiBaseURL + '/jobApplications2023';

    private _state: State = {
        page: 1,
        pageSize: 25,
        searchTerm: '',
        searchByDateStart: '',
        searchByDateEnd: '',
        sortColumn: '',
        sortDirection: ''
    };

    constructor(private pipe: DecimalPipe, private http: HttpClient) {

        let startDate = new Date();
        startDate.setDate(startDate.getDate() - 365);
        this.searchByDateStart = formatDate(startDate, 'yyyy-MM-dd', 'en');
        this.searchByDateEnd = formatDate(new Date(), 'yyyy-MM-dd', 'en');
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._records$.next(result.records);
            this._total$.next(result.total);
        });
        
        this._search$.next();

    }

    get records$() { return this._records$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchByDateStart() { return this._state.searchByDateStart; }
    get searchByDateEnd() { return this._state.searchByDateEnd; }

    set page(page: number) { this._set({page}); }
    set pageSize(pageSize: number) { this._set({pageSize}); }
    set searchByDateStart(searchByDateStart: string) { this._set({searchByDateStart}); }
    set searchByDateEnd(searchByDateEnd: string) { this._set({searchByDateEnd}); }
    set searchTerm(searchTerm: string) { this._set({searchTerm}); }
    set sortColumn(sortColumn: SortColumnJobSearch2023Record) { this._set({sortColumn}); }
    set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    public _search(): Observable<SearchResult> {
        return this.getRecordData().pipe(
            map((data) => {
                //console.log("Data: " + data);
                const { sortColumn, sortDirection, pageSize, 
                    page, searchTerm, searchByDateStart, searchByDateEnd } = this._state;
                let allRecordList: JobSearch2023Record[] = [];
                allRecordList = data;
                let records = sort(allRecordList, sortColumn, sortDirection);
                let timeStart = searchByDateStart;
                let timeEnd = searchByDateEnd;
                records = records.filter(
                    m =>
                        new Date(m.date) >= new Date(timeStart) &&
                        new Date(m.date) <= new Date(timeEnd)
                );
                const total = records.length;
                records = records.slice((page - 1) * this.pageSize, (page - 1) * pageSize + pageSize);
                console.log("Records: " + total);
                return { records, total };
            }),
            catchError(() => {
                return EMPTY;
            }),
        );        
    }

    @LiquidCache('jobSearch2023Table', {
        duration: 3600,
        storageType: LiquidCacheStorageTypes.inMemory
    })

    public getRecordData() {
        console.log("Getting data...");
        return this.http.get<JobSearch2023Record[]>(this.urlPreRecords).pipe(
            retryWithBackoff(1000, 3),
            catchError(() => {
                return EMPTY;
            }),
            shareReplay()
        )
    }

}
