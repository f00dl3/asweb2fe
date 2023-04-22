import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OldJobSearch2023Component } from './job-search2023.component';

describe('JobSearch2023Component', () => {
  let component: OldJobSearch2023Component;
  let fixture: ComponentFixture<OldJobSearch2023Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldJobSearch2023Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldJobSearch2023Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
