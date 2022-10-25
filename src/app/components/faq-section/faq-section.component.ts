import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-section',
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.scss']
})
export class FaqSectionComponent implements OnInit {
  questionsArray = [
    'What features does Good Knight provide?',
    'How much does Good Knight cost?',
    'My admins/mods are careful and would never get hacked!',
    'How does the Good Knight stop NFT scams?',
    'Wait, Good Knight is going to store a password? Is it secure?',
    'What happens if the Good Knight database is compromised?',
    'I have <insert your favorite bot> (AutoMod, Dyno, MEE6, Wick, Beemo, etc.), why do I need Good Knight?'
  ];

  constructor() {}

  ngOnInit(): void {}
}
