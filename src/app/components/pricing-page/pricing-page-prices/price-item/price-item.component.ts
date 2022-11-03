import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'price-item',
  templateUrl: './price-item.component.html',
  styleUrls: ['./price-item.component.scss']
})
export class PriceItemComponent implements OnInit {
  @Input() indexCard = 0;

  cardItems = [
    {
      title: 'Knight Tier',
      access: 'Monthly Access',
      advantages: [
        'Channel-specific list whitelists',
        'Channel lockdown',
        'Embed creator and more...'
      ]
    },
    {
      title: 'Round Table Tier',
      access: 'Pay Monthly',
      advantages: [
        'Customized secure announcements',
        'Panic mode',
        'Whitelist link limit increase to 1000'
      ]
    },
    {
      title: 'Champion Tier',
      access: 'Lifetime Subscription',
      advantages: ['Unlimited whitelists', 'Unlimited moderators and admins']
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
