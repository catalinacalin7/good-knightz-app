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
      color: 'violet',
      img: 'assets/icon1.png'
    },
    {
      text: 'Support',
      color: 'white',
      img: 'assets/support.svg'
    },
    {
      text: 'Twitter',
      color: 'blue',
      img: 'assets/twitericon.svg'
    },
    {
      text: 'Documentation',
      color: 'transparent',
      img: 'assets/docs.png'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
