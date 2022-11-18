import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-premium-page-prices',
  templateUrl: './premium-page-prices.component.html',
  styleUrls: ['./premium-page-prices.component.scss']
})
export class PremiumPagePricesComponent implements OnInit {
  pricesItems = [0, 1, 2];
  constructor() {}

  ngOnInit(): void {}

  navigateToDetails() {
    window.location.href = 'https://discord.com/invite/GwDw95vPyT';
  }
}
