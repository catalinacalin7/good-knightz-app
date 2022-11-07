import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rounded-button',
  templateUrl: './rounded-button.component.html',
  styleUrls: ['./rounded-button.component.scss']
})
export class RoundedButtonComponent implements OnInit {
  @Input() color = '';
  @Input() text = '';
  @Input() img = '';
  @Input() url = '';

  src: string = '';
  constructor() {}

  ngOnInit(): void {}

  navigateToUrl(): void {
    window.location.href = this.url;
  }
}
