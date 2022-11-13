import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-premium-page',
  templateUrl: './premium-page.component.html',
  styleUrls: ['./premium-page.component.scss']
})
export class PremiumPageComponent implements OnInit {
  title = 'Defend your Discord realm from hackers';
  paragraph =
    'The only bot that can protect your discord server after an account compromise';
  constructor() {}

  ngOnInit(): void {}
}
