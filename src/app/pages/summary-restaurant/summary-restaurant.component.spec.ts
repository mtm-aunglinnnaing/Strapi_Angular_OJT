import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryRestaurantComponent } from './summary-restaurant.component';

describe('SummaryRestaurantComponent', () => {
  let component: SummaryRestaurantComponent;
  let fixture: ComponentFixture<SummaryRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
