import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'price-item',
  templateUrl: './price-item.component.html',
  styleUrls: ['./card-style.component.scss', './price-item.component.scss']
})
export class PriceItemComponent implements OnInit {
  @Input() indexCard = 0;

  cardItems = [
    {
      title: 'Knight Tier',
      access: 'Monthly Access',
      advantages: [
        'Channel-specific link allowlists',
        'Channel lockdown',
        'Embed creator and more...'
      ]
    },
    {
      title: 'Round Table Tier',
      access: 'Pay Monthly',
      advantages: [
        'Multiple Good Knight admins',
        'Panic mode',
        'Whitelist link limit increase to 1000'
      ]
    },
    {
      title: 'Champion Tier',
      access: 'Lifetime Subscription',
      advantages: [
        'Unlimited allowlists',
        'Unlimited moderators and admins',
        'Priority support and more...'
      ]
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
