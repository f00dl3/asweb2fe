import { Component } from '@angular/core';
import { JobSearch2023Service } from 'src/app/services/basic/jobSearch2023.service';
import { JobSearch2023Record } from 'src/app/entities/jobSearch2023Record';

@Component({
  selector: 'app-jobSearch2023',
  templateUrl: './job-search2023-basic.component.html',
  styleUrls: ['./job-search2023-basic.component.css']
})

export class OldJobSearch2023Component {

  jobSearchResults: JobSearch2023Record[] = [];

  constructor(
    private jobSearch2023Service: JobSearch2023Service
  ) { }

  getListJobSearch2023Applications(): void {
    this.jobSearch2023Service.getJobSearch2023Applications()
      .subscribe(data => {
        this.jobSearchResults = data;
      })
  }

  ngOnInit() {
    console.log("Initiated old Job Search component.");
    this.getListJobSearch2023Applications();
  }

}
