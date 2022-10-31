import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'price-item',
  templateUrl: './price-item.component.html',
  styleUrls: ['./price-item.component.scss']
})
export class PriceItemComponent implements OnInit {
  @Input() title = '';
  constructor() {}

  ngOnInit(): void {}
}
