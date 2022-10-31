import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPagePricesComponent } from './pricing-page-prices.component';

describe('PricingPagePricesComponent', () => {
  let component: PricingPagePricesComponent;
  let fixture: ComponentFixture<PricingPagePricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricingPagePricesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingPagePricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
