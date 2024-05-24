import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteActivityComponent } from './complete-activity.component';

describe('CompleteActivityComponent', () => {
  let component: CompleteActivityComponent;
  let fixture: ComponentFixture<CompleteActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
