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
    //window.alert("Clicked old version!");
    this.showJobSearchRecords2023 = !this.showJobSearchRecords2023;
    this.showLanding = !this.showLanding;
  }

  doShowJobSearchRecords2023New() {
    //window.alert("Clicked new version!");
    this.showJobSearchRecords2023New = !this.showJobSearchRecords2023New;
    this.showLanding = !this.showLanding;
  }

  healthStatus: String = "Connecting...";
    
  ngOnInit(): void {    

  }
  
}
