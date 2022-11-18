import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-landing-description',
  templateUrl: './landing-description.component.html',
  styleUrls: ['./landing-description.component.scss']
})
export class LandingDescriptionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    AOS.init({ startEvent: 'load' });
  }
}
