import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing-page',
  templateUrl: './pricing-page.component.html',
  styleUrls: ['./pricing-page.component.scss']
})
export class PricingPageComponent implements OnInit {
  title = 'Defend your Discord realm from hackers';
  paragraph =
    'The only bot that can protect your discord server after an account compromise';
  constructor() {}

  ngOnInit(): void {}
}
