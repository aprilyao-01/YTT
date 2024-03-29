import { Component, OnDestroy, OnInit } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from '../../../services/watchlist.service';
import { CurrentPrice, InsiderResult, News, Profile, StockV2 } from '../../../shared/models/Stock';
import { PortfolioService } from '../../../services/portfolio.service';
import { Subscription, exhaustMap, interval, of } from 'rxjs';
import { ChartComponent } from '../../partials/chart/chart.component';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit, OnDestroy{
  
  // from service
  loading$ = this.stockService.loading$;
  stockData$ = this.stockService.stockData$;
  error$ = this.stockService.error$;

  //for setting alert
  alertVisible: boolean = false;
  alertCondition: string = 'undefined';
  alertTicker: string = '';

  // for automate
  private updateSubscription: Subscription | undefined;

  
  // page variables
  stockV2: StockV2 | null = null;
  currentTicker: string = 'home';
  currentProfile: Profile | null = null;
  currentQuote: CurrentPrice | null = null;
  currentPeers: string[] = [];
  currentNews: News[] = [];
  currentInsider: InsiderResult | null = null;
  isInWatchlist: boolean = false;
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
    private watchlistService: WatchlistService, private router: Router) {  }
    

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const { ticker } = params;
      console.log('ticker:', ticker);

      if(ticker && ticker !== 'home'){
        this.search(ticker);
      } else {
        this.loadFromCache();   //only occurs when switch back to search tab
      }
    });

    // handling data, and error states
    this.stockService.stockData$.subscribe(data => {
      this.stockV2 = data;
      if(data) {

        this.currentProfile = this.stockService.getStockFromLocal('profile');
        this.currentQuote = data.currentPrice;
        this.currentPeers = this.stockService.getStockFromLocal('peers');
        this.currentNews = this.stockService.getStockFromLocal('news');
        this.currentInsider = this.stockService.getStockFromLocal('insider');

        this.isInWatchlist = this.watchlistService.isWatched(data.profile.ticker);
      }
    });

    this.stockService.error$.subscribe(error => {
      if(error) {
        this.changeAlert("notFound");
      }
    });

    this.setAutoUpdate();

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
    this.currentTicker = ticker.toUpperCase();
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

  setAutoUpdate(){
    // interval fires every 15 seconds
    this.updateSubscription = interval(15000).pipe(
      // check if the market is open before trying to load new data
      exhaustMap(() => {
        if (this.stockService.isMarketOpen() && this.currentTicker !== 'home') {
          return this.stockService.getUpdate(this.currentTicker);
        }
        return of(null); // If market is closed or ticker is 'home', do nothing
      })
    ).subscribe(data => {
      // If market is open, data will be loaded; otherwise, nothing happens
      if (data && this.currentTicker !== 'home') {
        this.stockService.getUpdate(this.currentTicker);
      }
    });
  }

  loadFromCache(): void {
    this.currentProfile = this.stockService.getStockFromLocal('profile');
    this.currentTicker = this.stockService.getStockFromLocal('profile').ticker;
    this.currentQuote = this.stockService.getStockFromLocal('quote');
    this.currentPeers = this.stockService.getStockFromLocal('peers');
    this.currentNews = this.stockService.getStockFromLocal('news');
    this.currentInsider = this.stockService.getStockFromLocal('insider');

    this.isInWatchlist = this.watchlistService.isWatched(this.currentTicker);
    this.router.navigateByUrl('/search/' + this.currentTicker);
  }

  ngOnDestroy(): void {
    // clean up subscription when the component is destroyed
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
