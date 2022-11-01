import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-section',
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.scss']
})
export class FaqSectionComponent implements OnInit {
  questionsArray = [
    {
      question: 'What features does Good Knight provide?',
      answer: `All of the existing Discord bots attempt to prevent hacks, scams, raids, etc. before they happen but are useless against a hacker that has already compromised an account.
              Good Knight’s primary use, as layer-2 security, is to defend your server in this worst-case scenario!`,
      shouldDisplayAsnwer: false
    },
    {
      question: 'How much does Good Knight cost?',
      answer: `All of the existing Discord bots attempt to prevent hacks, scams, raids, etc. before they happen but are useless against a hacker that has already compromised an account.
      Good Knight’s primary use, as layer-2 security, is to defend your server in this worst-case scenario!`,
      shouldDisplayAsnwer: false
    },
    {
      question: 'My admins/mods are careful and would never get hacked!',
      answer: `All of the existing Discord bots attempt to prevent hacks, scams, raids, etc. before they happen but are useless against a hacker that has already compromised an account.
      Good Knight’s primary use, as layer-2 security, is to defend your server in this worst-case scenario!`,
      shouldDisplayAsnwer: false
    },
    {
      question: 'How does the Good Knight stop NFT scams?',
      answer: `All of the existing Discord bots attempt to prevent hacks, scams, raids, etc. before they happen but are useless against a hacker that has already compromised an account.
      Good Knight’s primary use, as layer-2 security, is to defend your server in this worst-case scenario!`,
      shouldDisplayAsnwer: false
    },
    {
      question: 'Wait, Good Knight is going to store a password? Is it secure?',
      answer: `All of the existing Discord bots attempt to prevent hacks, scams, raids, etc. before they happen but are useless against a hacker that has already compromised an account.
      Good Knight’s primary use, as layer-2 security, is to defend your server in this worst-case scenario!`,
      shouldDisplayAsnwer: false
    },
    {
      question: 'What happens if the Good Knight database is compromised?',
      answer: `All of the existing Discord bots attempt to prevent hacks, scams, raids, etc. before they happen but are useless against a hacker that has already compromised an account.
      Good Knight’s primary use, as layer-2 security, is to defend your server in this worst-case scenario!`,
      shouldDisplayAsnwer: false
    },
    {
      question: 'I have <insert your favorite bot> (AutoMod, Dyno, MEE6, Wick, Beemo, etc.), why do I need Good Knight?',
      answer: `All of the existing Discord bots attempt to prevent hacks, scams, raids, etc. before they happen but are useless against a hacker that has already compromised an account.
      Good Knight’s primary use, as layer-2 security, is to defend your server in this worst-case scenario!`,
      shouldDisplayAsnwer: false
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleVisibleAnswerClass(question: any) {
    question.shouldDisplayAsnwer = !question.shouldDisplayAsnwer;
  }
}
