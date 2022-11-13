import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-premium-page-advantages',
  templateUrl: './premium-page-advantages.component.html',
  styleUrls: ['./premium-page-advantages.component.scss']
})
export class PremiumPageAdvantagesComponent implements OnInit {
  advantageParts = [
    {
      title: 'Security',
      partItems: [
        {
          title: 'Password & 2FA Protection',
          icon: ['yes', 'yes', 'yes', 'yes']
        },
        {
          title: 'Server Panic Mode',
          icon: ['no', 'no', 'yes', 'yes']
        },
        {
          title: 'Channel Lockdown',
          icon: ['no', 5, 'infinity', 'infinity']
        },
        {
          title: 'Good Knight Admins',
          icon: [1, 1, 4, 'infinity']
        },
        {
          title: 'Good Knight Moderators',
          icon: [4, 6, 10, 'infinity']
        }
      ]
    },
    {
      title: 'Server Moderation',
      partItems: [
        {
          title: 'Instant Moderation Commands',
          icon: ['yes', 'yes', 'yes', 'yes']
        },
        {
          title: 'Permissions Wizard',
          icon: ['yes', 'yes', 'yes', 'yes']
        },
        {
          title: 'Customized Annoucements',
          icon: ['no', 'no', 'yes', 'yes']
        },
        {
          title: 'Embed Creator',
          icon: ['no', 'yes', 'yes', 'yes']
        }
      ]
    },
    {
      title: 'Anti-link',
      partItems: [
        {
          title: 'Server-wide link allowlist',
          icon: ['yes', 'yes', 'yes', 'yes']
        },
        {
          title: 'Link allowlist limit',
          icon: [100, 200, 500, 'infinity']
        },
        {
          title: 'Channel-specific link allowlists',
          icon: [0, 2, 5, 'infinity']
        },
        {
          title: 'Compromised Bot Protection',
          icon: ['yes', 'yes', 'yes', 'yes']
        }
      ]
    },
    {
      title: 'Anti-webhook',
      partItems: [
        {
          title: 'Webhook Manager',
          icon: ['yes', 'yes', 'yes', 'yes']
        },
        {
          title: 'Webhook allowlist limit',
          icon: [25, 25, 50, 'infinity']
        },
        {
          title: 'Server-wide webhook allowlist',
          icon: ['yes', 'yes', 'yes', 'yes']
        }
      ]
    }
  ];

  isNumber(val: any): boolean {
    return typeof val === 'number';
  }
  constructor() {}

  goToServer() {
    window.location.href =
      'https://discord.com/api/oauth2/authorize?client_id=957481307405975552&permissions=2953276446&scope=applications.commands%20bot';
  }

  goToTable() {
    let x = document.querySelector('#advantages-body');
    if (x) {
      x.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnInit(): void {}
}
