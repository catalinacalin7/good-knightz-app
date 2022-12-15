import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDataService } from 'src/app/common-data.service';
import AOS from 'aos';

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

  scrollRef = 0;
  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.scrollRef <= 10 ? this.scrollRef++ : AOS.refresh();
    });
    AOS.init({
      once: false
    });

    let iphoneVideo = document.getElementById(
      'iphone-video'
    ) as HTMLVideoElement | null;
    let computerVideo = document.getElementById(
      'computer-video'
    ) as HTMLVideoElement | null;
    if (iphoneVideo) {
      console.log('iphone video');
      iphoneVideo.play();
    }

    if (computerVideo) {
      console.log('computer video');
      computerVideo.play();
    }
  }

  scrollToTable() {
    this.commonData.setMustScroll(true);
    this.router.navigateByUrl('premium');
  }
}
