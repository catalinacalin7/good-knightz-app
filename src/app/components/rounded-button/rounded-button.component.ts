import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rounded-button',
  templateUrl: './rounded-button.component.html',
  styleUrls: ['./rounded-button.component.scss']
})
export class RoundedButtonComponent implements OnInit {
  @Input() color = '';
  @Input() text = '';
  src: string = '';
  constructor() {}

  ngOnInit(): void {}
}
