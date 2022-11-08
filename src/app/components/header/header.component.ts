import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isOpenBurger: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  getActiveLink() {
    var n = window.location.href.lastIndexOf('/');
    var result = window.location.href.substring(n);
    if (result.indexOf('/features') >= 0) {
      return 'features';
    } else if (result === '') {
      return 'features';
    } else if (result.indexOf('/pricing') >= 0) {
      return 'pricing';
    }
    return 'features';
  }

  changeDisplayBurgerMenu() {
    console.log('changeDisplayBurgerMenu');
    this.isOpenBurger = !this.isOpenBurger;
    console.log('this.isOpenBurger ', this.isOpenBurger);
  }

  changeRoute(route: string) {
    console.log('changeRoute ', route);
    if (this.isOpenBurger) {
      this.changeDisplayBurgerMenu();
    }
    this.router.navigateByUrl('/' + route);
  }
}
