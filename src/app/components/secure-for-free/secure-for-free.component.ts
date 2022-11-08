import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secure-for-free',
  templateUrl: './secure-for-free.component.html',
  styleUrls: ['./secure-for-free.component.scss']
})
export class SecureForFreeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  getActiveLink() {
    var n = window.location.href.lastIndexOf('/');
    var result = window.location.href.substring(n + 1);
    if (result === '') {
      return 'features';
    }
    return result;
  }
}
