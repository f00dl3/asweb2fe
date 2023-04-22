import { DecimalPipe } from '@angular/common';
import { Component, Injectable, QueryList, ViewChildren, Input } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import * as XSLX from 'xlsx';
import { NgbdSortableHeader, SortEventJobSearch2023Record } from 'src/app/directives/sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobSearch2023Record } from 'src/app/entities/jobSearch2023Record';
import { JobSearch2023RecordService } from 'src/app/services/jobSearch2023Record.service';
import { DataCacheService } from 'src/app/services/datacache.service';

const FILTER_PAG_REGEX = /[^0-90]/g;

@Component({
  selector: 'app-job-search2023-new',
  templateUrl: './job-search2023.component.html',
  styleUrls: ['./job-search2023.component.css'],
  providers: [ DecimalPipe, JobSearch2023RecordService ]
})

@Injectable({providedIn: 'root'})

export class JobSearch2023Component {

  page = 1;
  jobSearch2023Records$: Observable<JobSearch2023Record[]>;
  total$!: Observable<number>;
  dataObj!: string;
  fileName = 'jobSearch2023Records.xlsx';


  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(
    public jobSearch2023RecordTable: JobSearch2023RecordService,
    public dataCacheService: DataCacheService,
    private modalService: NgbModal
    ) { 
      this.jobSearch2023Records$ = jobSearch2023RecordTable.records$;
    }


  onSortJobSearch2023Records({column, direction}: SortEventJobSearch2023Record) {
    this.headers.forEach(header => {
      if(header.jsr_sortable !== column) {
        header.jsr_direction = '';
      }
    });
    this.jobSearch2023RecordTable.sortColumn = column;
    this.jobSearch2023RecordTable.sortDirection = direction;
  }

  exportExcelJobSearch2023(): void {
    let element = document.getElementById('main-table');
    const ws: XSLX.WorkSheet = XSLX.utils.table_to_sheet(element);
    const wb: XSLX.WorkBook = XSLX.utils.book_new();
    XSLX.utils.book_append_sheet(wb, ws, 'Data');
    XSLX.writeFile(wb, this.fileName);
  }

  ngOnInit(): void { }

  selectJobSearch2023RecordPage(page: string) {
    this.page = parseInt(page, 25) || 1;
    this.jobSearch2023RecordTable.page = this.page;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

}