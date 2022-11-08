import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-description',
  templateUrl: './landing-description.component.html',
  styleUrls: ['./landing-description.component.scss']
})
export class LandingDescriptionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  loadAnchor(anchor: string) {
    window.location.pathname =
      ('' + window.location).replace(/#[A-Za-z0-9_]*$/, '') + '#' + anchor;
  }
}
