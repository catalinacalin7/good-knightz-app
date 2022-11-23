import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secure-for-free',
  templateUrl: './secure-for-free.component.html',
  styleUrls: ['./secure-for-free.component.scss']
})
export class SecureForFreeComponent implements OnInit {
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

  goToPriceTable() {
    if (this.getActiveLink() === 'features') {
      this.router.navigateByUrl('/premium');
    } else {
      let x = document.querySelector('#features-table');
      if (x) {
        x.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }
  }
}
