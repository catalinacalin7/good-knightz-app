import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing-page-prices',
  templateUrl: './pricing-page-prices.component.html',
  styleUrls: ['./pricing-page-prices.component.scss']
})
export class PricingPagePricesComponent implements OnInit {
  pricesItems = [
    { title: 'Knight Tier' },
    { title: 'Round Table Tier' },
    { title: 'Champion Tier' }
  ];
  constructor() {}

  ngOnInit(): void {}
}
