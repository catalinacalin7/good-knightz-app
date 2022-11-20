import { Component, OnInit } from '@angular/core';
// @ts-ignore: Unreachable code error
import AOS from 'aos';

@Component({
  selector: 'app-landing-description',
  templateUrl: './landing-description.component.html',
  styleUrls: ['./landing-description.component.scss']
})
export class LandingDescriptionComponent implements OnInit {
  isOpenedAnimations = [false, false, false, false, false];
  constructor() {}

  ngOnInit(): void {
    AOS.init({ startEvent: 'load' });
  }

  addAnimation(id: number) {
    if (!this.isOpenedAnimations[id]) {
      document
        .getElementsByClassName('frame' + id)[0]
        .classList.add('frame-animation');
      this.isOpenedAnimations[id] = true;
    } else {
      document
        .getElementsByClassName('frame' + id)[0]
        .classList.remove('frame-animation');
      this.isOpenedAnimations[id] = false;
    }
  }
}
