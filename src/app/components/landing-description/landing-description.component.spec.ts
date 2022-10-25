import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingDescriptionComponent } from './landing-description.component';

describe('LandingDescriptionComponent', () => {
  let component: LandingDescriptionComponent;
  let fixture: ComponentFixture<LandingDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
