import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public footerItemsMobile = [
    {
      text: 'Privacy Policy',
      url: 'https://docs.goodknightbot.com/support/privacy-policy'
    },
    {
      text: 'Terms Of Service',
      url: 'https://docs.goodknightbot.com/support/terms-of-service'
    },
    {
      text: 'Support',
      url: 'https://discord.gg/GwDw95vPyT'
    }
  ];
  public footerButtons = [
    {
      text: 'Add to your server',
      color: 'violet',
      img: 'assets/icon1.png',
      url:
        'https://discord.com/api/oauth2/authorize?client_id=957481307405975552&permissions=2953276446&scope=applications.commands%20bot'
    },
    {
      text: 'Support',
      color: 'white',
      img: 'assets/support.svg',
      url: 'https://discord.gg/GwDw95vPyT'
    },
    {
      text: 'Twitter',
      color: 'blue',
      img: 'assets/twitericon.svg',
      url: 'https://twitter.com/thegoodknightz'
    },
    {
      text: 'Documentation',
      color: 'dark-violet',
      img: 'assets/docs.png',
      url: 'https://docs.goodknightbot.com/'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  goToPrivacyPolicy(): void {
    window.location.href =
      'https://docs.goodknightbot.com/support/privacy-policy';
  }

  goToTermsOfService(): void {
    window.location.href =
      'https://docs.goodknightbot.com/support/terms-of-service';
  }

  goToTwitter(): void {
    window.location.href = 'https://twitter.com/thegoodknightz';
  }

  goToServer(): void {
    window.location.href = 'https://discord.gg/GwDw95vPyT';
  }
}
