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
    window.location.href =
      'https://discord.com/api/oauth2/authorize?client_id=957481307405975552&permissions=2953276446&scope=applications.commands%20bot';
  }
}
