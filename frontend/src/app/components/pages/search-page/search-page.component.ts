import { Component, OnInit } from '@angular/core';
// import { sample_stock, sample_stockV2 } from '../../../../data';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from '../../../services/watchlist.service';
import { Observable } from 'rxjs';
import { Stock, StockV2 } from '../../../shared/models/Stock';
import { time } from 'highcharts';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit {
  //for setting alert
  alertVisible: boolean = false;
  alertCondition: string = 'undefined';
  alertTicker: string = '';

  isInWatchlist: boolean = false;
  currentTicker: string = 'home';

  stockV2: StockV2 | null = null;

  // from service
  loading$ = this.stockService.loading$;
  stockData$ = this.stockService.stockData$;
  error$ = this.stockService.error$;

  constructor(private stockService: StockService, private activatedRoute: ActivatedRoute,
    private watchlistService: WatchlistService, private router: Router) {  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params.ticker && params.ticker !== 'home') {
        this.search(params.ticker);
      } else {
        this.currentTicker = 'home';
      }
    });

    // handling data, and error states
    this.stockService.stockData$.subscribe(data => {
      this.stockV2 = data;
      if(data) {
        this.isInWatchlist = this.watchlistService.isWatched(data.profile.ticker);
      }
    });

    this.stockService.error$.subscribe(error => {
      if(error) {
        this.changeAlert("notFound");
      }
    });
  }

  toggleToWatchlist(): void{
    if(!this.stockV2) return;
    this.isInWatchlist = this.watchlistService.isWatched(this.stockV2.profile.ticker);
    this.isInWatchlist? this.watchlistService.removeFromWatchlist(this.stockV2.profile.ticker) : this.watchlistService.addToWatchlist(this.stockV2);
    this.changeAlert(this.isInWatchlist? 'removeWatchlist' : 'addWatchlist', this.stockV2.profile.ticker);
    this.isInWatchlist = !this.isInWatchlist;
  }

  search(ticker: string): void {
    // reset any previous error state before starting a new search
    this.stockService.setErrorSubject(null);
  
    if (!ticker) {
      this.changeAlert("noInput");
      return;
    }
  
    if (ticker === 'home') {
      // reset the UI, clear the current stock data display
      this.currentTicker = 'home';
      this.stockService.setStockDataSubject(null);
      return;
    }
    this.router.navigateByUrl('/search/' + ticker);
    // Set the current ticker and proceed with the search for valid tickers other than 'home'
    this.currentTicker = ticker;
    this.stockService.loadStockData(ticker);
  }
  

  OnNotify(ticker: string): void {
    console.log('Notify: ', ticker);
    this.search(ticker)
  }

  changeAlert(condition:string, ticker?: string): void {
    this.alertCondition = condition;
    this.alertVisible = true;
    ticker? this.alertTicker = ticker : this.alertTicker = '';
  }
}
