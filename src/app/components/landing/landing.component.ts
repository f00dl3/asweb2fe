import { Component, OnInit } from '@angular/core';
import { HealthService } from 'src/app/services/basic/health.service';
import { SharedBeans as sb } from 'src/app/SharedBeans';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent implements OnInit {

  showLanding: boolean = true;
  showJobSearchRecords2023: boolean = false;
  showJobSearchRecords2023New: boolean = false;
  title: string = sb.apiTitle;

  constructor(private healthService: HealthService) { }

  doShowJobSearchRecords2023() {
    this.hideEverything();
    this.showJobSearchRecords2023 = true;
  }

  doShowJobSearchRecords2023New() {
    this.hideEverything();
    this.showJobSearchRecords2023New = true;
  }

  hideEverything() {
    this.showLanding = false;
    this.showJobSearchRecords2023 = false;
    this.showJobSearchRecords2023New = false;
  }

  healthStatus: String = "Connecting...";
    
  ngOnInit(): void {    

  }
  
}
