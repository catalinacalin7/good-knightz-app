import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPageAdvantagesComponent } from './pricing-page-advantages.component';

describe('PricingPageAdvantagesComponent', () => {
  let component: PricingPageAdvantagesComponent;
  let fixture: ComponentFixture<PricingPageAdvantagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingPageAdvantagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingPageAdvantagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
