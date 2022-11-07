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
      answer: `• In-server password protection
• Anti-link and link whitelisting
• Anti-webhook
• Password protected server lockdown
• Shielded mass mentions
• Protection against compromised bots
• Locked mod commands`,
      shouldDisplayAsnwer: false
    },
    {
      question: 'How much does Good Knight cost?',
      answer: `It’s FREE! And the Good Knight team has pledged to always provide the necessary security features for free.`,
      shouldDisplayAsnwer: false
    },
    {
      question: 'My admins/mods are careful and would never get hacked!',
      answer: `No matter how careful you are, hackers are skilled at phishing and socially engineering admins/mods into their scams. All it takes is one mistake to destroy your server and potentially lead to thousands of dollars in damages. Do you trust your admins/mods enough to take that risk?`,
      shouldDisplayAsnwer: false
    },
    {
      question: 'How does the Good Knight stop NFT scams?',
      answer: `The bot’s innovative anti-link technology shields projects by automatically deleting any link that your server hasn't registered with the Good Knight! Even if an admin or mod account is compromised, attackers can't post their malicious links without the mod's Good Knight password.`,
      shouldDisplayAsnwer: false
    },
    {
      question: 'Wait, Good Knight is going to store a password? Is it secure?',
      answer: `Passwords are salted, encrypted, and one-way hashed to achieve the highest level of security. This means passwords are never decrypted at any time. For more information on password protection, visit the Good Knight documentation.`,
      shouldDisplayAsnwer: false
    },
    {
      question: 'What happens if the Good Knight database is compromised?',
      answer: `All passwords are encrypted and, since they are one-way hashed, even if the remote database was leaked they would be uncrackable. For more information on password protection, visit the Good Knight documentation.`,
      shouldDisplayAsnwer: false
    },
    {
      question: 'I have <insert your favorite bot> (AutoMod, Dyno, MEE6, Wick, Beemo, etc.), why do I need Good Knight?',
      answer: `All of the existing Discord bots attempt to prevent hacks, scams, raids, etc. before they happen but are useless against a hacker that has already compromised an account. Good Knight’s primary use, as layer-2 security, is to defend your server in this worst-case scenario!`,
      shouldDisplayAsnwer: false
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleVisibleAnswerClass(question: any) {
    question.shouldDisplayAsnwer = !question.shouldDisplayAsnwer;
  }
}
