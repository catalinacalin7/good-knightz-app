import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isOpenBurger: boolean = false;
  isOpenAnchorMenu: boolean = false;
  isOpenSubmenu: boolean = false;
  featuresMenu = [
    { title: 'Layer-2 Security', fragment: 'layer2-sec-wrap' },
    { title: 'Password Protection', fragment: 'password-prot-wrap' },
    { title: 'Panic Mode', fragment: 'panic-mode-wrap' },
    { title: 'Permission Wizard', fragment: 'power-wizard-wrap' },
    { title: 'And more..', fragment: 'anti-link-wrap' },
    { title: 'FAQ', fragment: 'faq-wrapper' }
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  getActiveLink() {
    var n = window.location.href.lastIndexOf('/');
    var result = window.location.href.substring(n);
    if (result.indexOf('/features') >= 0) {
      return 'features';
    } else if (result === '') {
      return 'features';
    } else if (result.indexOf('/premium') >= 0) {
      return 'premium';
    }
    return 'features';
  }

  changeDisplayBurgerMenu() {
    this.isOpenBurger = !this.isOpenBurger;
  }

  featuresClickHandler() {
    if (this.getActiveLink() === 'features') {
      this.isOpenSubmenu = !this.isOpenSubmenu;
    } else {
      this.router.navigateByUrl('/features');
    }
  }

  changeDisplayAnchorMenu(event: Event) {
    event.preventDefault();
    this.isOpenAnchorMenu = !this.isOpenAnchorMenu;
  }

  changeRoute(event: Event, route: string) {
    if (route === this.getActiveLink() && route === 'features') {
      this.changeDisplayAnchorMenu(event);
    } else {
      if (this.isOpenBurger) {
        this.changeDisplayBurgerMenu();
      }
      this.router.navigateByUrl('/' + route);
    }
  }
}
