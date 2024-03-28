import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  searchInput: string;
  // searchTicker: string;


  constructor() { 
    this.searchInput = "";
    // this.searchTicker = 'home';
  }

  setSearchInput(input: string) {
    this.searchInput = input;
  }

  getSearchInput() {
    return this.searchInput;
  }

  // setSearchTicker(ticker: string) {
  //   this.searchTicker = ticker;
  // }

  // getSearchTicker() {
  //   return this.searchTicker;
  // }
}
