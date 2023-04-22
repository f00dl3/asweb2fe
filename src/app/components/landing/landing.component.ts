import { Component, OnInit } from '@angular/core';
import { HealthService } from 'src/app/services/basic/health.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent implements OnInit {

  showJobSearchRecord2023New: boolean = false;
  showJobSearchRecord2023: boolean = true;

  constructor(private healthService: HealthService) { }

  healthStatus: String = "Connecting...";
    
  ngOnInit(): void {    

  }
  
}
