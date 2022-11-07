import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'square-button',
  templateUrl: './square-button.component.html',
  styleUrls: ['./square-button.component.scss']
})
export class SquareButtonComponent implements OnInit {
  @Input() color = '';
  @Input() text = '';
  @Input() bordercolor = '';
  @Input() url = '';

  constructor() {}

  ngOnInit(): void {}

  navigateToUrl(): void {
    window.location.href = this.url;
  }
}
