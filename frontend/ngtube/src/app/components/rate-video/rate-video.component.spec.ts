import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateVideoComponent } from './rate-video.component';

describe('RateVideoComponent', () => {
  let component: RateVideoComponent;
  let fixture: ComponentFixture<RateVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
