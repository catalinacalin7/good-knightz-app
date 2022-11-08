import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing-page-prices',
  templateUrl: './pricing-page-prices.component.html',
  styleUrls: ['./pricing-page-prices.component.scss']
})
export class PricingPagePricesComponent implements OnInit {
  pricesItems = [0, 1, 2];
  constructor() {}

  ngOnInit(): void {}

  navigateToDetails() {
    window.location.href = 'mailto:info@rarefiedstudios.com';
  }
}
