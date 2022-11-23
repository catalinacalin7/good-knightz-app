import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/common-data.service';

@Component({
  selector: 'app-landing-description',
  templateUrl: './landing-description.component.html',
  styleUrls: [
    './styles/landing-description.component.scss',
    './styles/anti-link-style.component.scss',
    './styles/layer2-sec-style.component.scss',
    './styles/password-prot-style.component.scss'
  ]
})
export class LandingDescriptionComponent implements OnInit {
  isOpenedAnimations = [false, false, false, false, false];
  constructor(private router: Router, private commonData: CommonDataService) {}

  ngOnInit(): void {}

  scrollToTable() {
    this.commonData.setMustScroll(true);
    this.router.navigateByUrl('premium');
  }
}
