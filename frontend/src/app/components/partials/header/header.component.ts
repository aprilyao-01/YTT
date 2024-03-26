import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent {

  activeTab: 'search' | 'watchlist' | 'portfolio' = 'search';

  setActiveTab(tab: 'search' | 'watchlist' | 'portfolio') {
    this.activeTab = tab;
  }
  
  // searchSymbol: String = "";
  validDataPresent: boolean = false;
  isSearchTabFlag: boolean = true;


  setSearchTab() {
    document.getElementById('nav-watchlist')?.classList.remove('active');
    document.getElementById('nav-portfolio')?.classList.remove('active');
    document.getElementById('nav-search')?.classList.add('active');
    // if (this.validDataPresent) {
    //   document.getElementById('nav-search')?.classList.add('active');
    // } else {
    //   document.getElementById('nav-search')?.classList.remove('active');
    // }
    // this.isSearchTabFlag = true;
  }

  setWatchlistTab() {
    document.getElementById('nav-search')?.classList.remove('active');
    document.getElementById('nav-watchlist')?.classList.add('active');
    document.getElementById('nav-portfolio')?.classList.remove('active');
    // this.isSearchTabFlag = false;
  }
  
  setPortfolioTab() {
    document.getElementById('nav-search')?.classList.remove('active');
    document.getElementById('nav-watchlist')?.classList.remove('active');
    document.getElementById('nav-portfolio')?.classList.add('active');
    // this.isSearchTabFlag = false;
  }
}