import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { sample_stock, sample_stockV2 } from '../../../../data';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from '../../../services/watchlist.service';
import { Observable } from 'rxjs';
import { InsiderResult, News, Stock, StockV2 } from '../../../shared/models/Stock';
import { time } from 'highcharts';
import { PortfolioService } from '../../../services/portfolio.service';
import Highcharts from 'highcharts';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit {
  
  // from service
  loading$ = this.stockService.loading$;
  stockData$ = this.stockService.stockData$;
  error$ = this.stockService.error$;

  //for setting alert
  alertVisible: boolean = false;
  alertCondition: string = 'undefined';
  alertTicker: string = '';

  
  // other page variables
  stockV2: StockV2 | null = null;
  currentTicker: string = 'home';
  isInWatchlist: boolean = false;
  news: News[] = [];
  insider: InsiderResult = {
    symbol: '',
    change: {
      total: 0,
      positiveVal: 0,
      negativeVal: 0
    },
    mspr: {
      total: 0,
      positiveVal: 0,
      negativeVal: 0
    }
  };
  

  constructor(private stockService: StockService, private activatedRoute: ActivatedRoute,
    private watchlistService: WatchlistService, private router: Router, private portfolioService: PortfolioService) {  }

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

        this.news = data.news;
        this.insider = data.insider;

        this.isInWatchlist = this.watchlistService.isWatched(data.profile.ticker);
        // this.updateMarketStatus();
      }
    });

    this.stockService.error$.subscribe(error => {
      if(error) {
        this.changeAlert("notFound");
      }
    });
  }

  changeAlert(condition:string, ticker?: string): void {
    this.alertCondition = condition;
    this.alertVisible = true;
    ticker? this.alertTicker = ticker : this.alertTicker = '';
  }

  toggleToWatchlist(): void{
    if(!this.stockV2) return;
    const isInWatchlist = this.watchlistService.isWatched(this.stockV2.profile.ticker);
    isInWatchlist? this.watchlistService.removeFromWatchlist(this.stockV2.profile.ticker) : this.watchlistService.addToWatchlist(this.stockV2);
    this.changeAlert(isInWatchlist? 'removeWatchlist' : 'addWatchlist', this.stockV2.profile.ticker);
    this.isInWatchlist = !isInWatchlist;
  }

  search(ticker: string): void {
    // reset any previous error state before starting a new search
    this.stockService.setErrorSubject(null);
  
    if (ticker === 'home') {
      // reset the UI, clear the current stock data display
      this.currentTicker = 'home';
      this.stockService.setStockDataSubject(null);
      return;
    }
    // this.router.navigateByUrl('/search/' + ticker);
    // Set the current ticker and proceed with the search for valid tickers other than 'home'
    this.currentTicker = ticker;
    this.stockService.loadStockData(ticker);
  }
  

  OnNotify(ticker: string): void {
    console.log('Notify: ', ticker);

    if (!ticker) {
      this.changeAlert("noInput");
      this.router.navigateByUrl('/search/home');
    } else {
      this.router.navigateByUrl('/search/' + ticker);
    }
  }

  updateCurrentPrice(){
    // TODO: update when market is open
  }

  OnSellClick(ticker: string): void {
    console.log('Sell: ', ticker);
    //TODO: add pop out for quantity

    // this.portfolioService.changeQuantity(-1, ticker);
  }

  OnBuyClick(ticker: string): void {
    console.log('Buy: ', ticker);
    //TODO: add pop out for quantity
    // this.portfolioService.changeQuantity(1, ticker);
  }
  
}
