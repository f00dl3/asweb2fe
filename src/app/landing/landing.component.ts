import { Component, OnInit } from '@angular/core';
import { HealthService } from '../_services/basic/health.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent implements OnInit {

  constructor(private healthService: HealthService) { }

  healthStatus: String = "Connecting...";
    
  ngOnInit(): void {

    this.healthService.healthStatus().subscribe({
      next: data => {
        this.healthStatus = JSON.parse(data);
      },
      error: err => {
        this.healthStatus = "Error!";
        console.log(err);
      }
          
    });

  }
  
}
