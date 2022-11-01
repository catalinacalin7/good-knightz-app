import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  getActiveLink() {
    var n = window.location.href.lastIndexOf('/');
    var result = window.location.href.substring(n + 1);
    if (result === '') {
      return 'features';
    }
    return result;
  }

  changeRoute(route: string) {
    this.router.navigateByUrl('/' + route);
  }
}
