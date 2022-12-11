import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent implements OnInit {
  servers = [
    'server-example-1',
    'server-example-2',
    'server-example-3',
    'server-example-4',
    'server-example-5'
  ];
  constructor() {}

  ngOnInit(): void {}
}
