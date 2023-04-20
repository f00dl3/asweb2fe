import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSearch2023Component } from './job-search2023.component';

describe('JobSearch2023Component', () => {
  let component: JobSearch2023Component;
  let fixture: ComponentFixture<JobSearch2023Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobSearch2023Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSearch2023Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
