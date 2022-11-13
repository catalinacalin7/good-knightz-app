import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'square-button',
  templateUrl: './square-button.component.html',
  styleUrls: ['./square-button.component.scss']
})
export class SquareButtonComponent implements OnInit {
  @Input() color = '';
  @Input() styleParams = '';
  @Input() text = '';
  @Input() bordercolor = '';
  @Input() url = '';

  constructor() {}

  ngOnInit(): void {}

  navigateToUrl(): void {
    if (this.url) {
      window.location.href = this.url;
    }
  }
}
