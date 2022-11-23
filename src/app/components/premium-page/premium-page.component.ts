import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../../common-data.service';

@Component({
  selector: 'app-premium-page',
  templateUrl: './premium-page.component.html',
  styleUrls: ['./premium-page.component.scss']
})
export class PremiumPageComponent implements OnInit {
  title = 'Defend your Discord realm from hackers';
  paragraph =
    'The only bot that can protect your discord server after an account compromise';
  constructor(private commonData: CommonDataService) {}

  ngOnInit(): void {
    if (this.commonData.getMustScroll()) {
      this.commonData.setMustScroll(false);
      var element = document.getElementById('features-table');
      var headerOffset = 100;
      if (element) {
        var elementPosition = element.getBoundingClientRect().top;
        var offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
}
