import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { JobSearch2023Component } from './components/job-search2023/job-search2023.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'jobSearch2023', component: JobSearch2023Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
