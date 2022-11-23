import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {
  private mustScroll = false;
  constructor() {}

  public setMustScroll(val: boolean) {
    this.mustScroll = val;
  }

  public getMustScroll(): boolean {
    return this.mustScroll;
  }
}
