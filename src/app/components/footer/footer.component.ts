import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public footerItemsMobile = ['Privacy Policy', 'Terms Of Service', 'Support'];
  public footerButtons = [
    {
      text: 'Add to your server',
      color: 'violet'
    },
    {
      text: 'Support',
      color: 'white'
    },
    {
      text: 'Twitter',
      color: 'blue'
    },
    {
      text: 'Documentation',
      color: 'transparent'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
