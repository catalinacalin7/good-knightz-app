import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing-page-advantages',
  templateUrl: './pricing-page-advantages.component.html',
  styleUrls: ['./pricing-page-advantages.component.scss']
})
export class PricingPageAdvantagesComponent implements OnInit {
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
          title: 'Permissions',
          icon: ['yes', 'yes', 'yes', 'yes']
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
          title: 'Permission Wizard',
          icon: ['no', 'no', 'no', 'no']
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
          title: 'Channel-specific link allowlists',
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

  ngOnInit(): void {}
}
