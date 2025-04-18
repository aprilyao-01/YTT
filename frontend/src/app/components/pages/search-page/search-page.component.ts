import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from '../../../services/watchlist.service';
import { CurrentPrice, InsiderResult, News, Profile, StockV2 } from '../../../shared/models/Stock';
import { Subscription, exhaustMap, interval, of } from 'rxjs';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

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

  // alert flags
  noInput: boolean = false;
  noData: boolean = false;
  buySuccess: boolean = false;
  sellSuccess: boolean = false;
  addWatchlist: boolean = false;
  removeWatchlist: boolean = false;

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
  isShow: boolean = true;

  constructor(private stockService: StockService, private activatedRoute: ActivatedRoute,
    private watchlistService: WatchlistService, private router: Router) {
     }
    

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const { ticker } = params;
      console.log('ticker:', ticker);

      if(ticker && ticker !== 'home'){
        this.search(ticker);
      } else {
        if(this.stockService.getStockFromLocal('profile'))
        {
          this.loadFromCache();  //only occurs when switch back to search tab
        } else {
          this.router.navigateByUrl('/search/home');
        }
      }
    });

    // handling data, and error states
    this.stockService.stockData$.subscribe(data => {
      this.stockV2 = data;
      if(data) {
        if(!data.profile.name) {
          // this.changeAlert("notFound");
          this.noData = true;
          this.isShow = false;
          
          // dismiss after 5s
          setTimeout(() => {
            this.noData = false;
          }, 5000);
        } else {
          this.noData = false;
          this.isShow = true;
          this.currentProfile = data.profile;
          this.currentQuote = data.currentPrice;
          this.currentPeers = data.peers;
          this.currentNews = data.news;
          this.currentInsider = data.insider;
          this.isInWatchlist = this.watchlistService.isWatched(data.profile.ticker);
        }
        console.log('notFound:', this.noData);
        
      }
    });

    this.stockService.error$.subscribe(error => {
      if(error) {
        console.log('error:', error);
        // this.changeAlert("notFound");
        // this.invalidSymbolFlag = true;
        // this.isShow = false;
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
    // this.changeAlert(isInWatchlist? 'removeWatchlist' : 'addWatchlist', this.stockV2.profile.ticker);
    isInWatchlist? this.removeWatchlist = true : this.addWatchlist = true;
    // dismiss after 5s
    setTimeout(() => {
      this.addWatchlist = false;
      this.removeWatchlist = false;
    }, 5000);
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
      // this.changeAlert("noInput");
      this.noInput = true;
      this.router.navigateByUrl('/search/home');
      this.isShow = false;
      // dismiss after 5s
      setTimeout(() => {
        this.noInput = false;
      }, 5000);
    } else {
      this.noInput = false;
      this.router.navigateByUrl('/search/' + ticker);
      this.isShow = true;
    }
  }

  handleTransactionSuccess(event: string) {
    if (event === 'buySuccess') {
      this.buySuccess = true;
    } else if (event === 'sellSuccess') {
      this.sellSuccess = true;
    }

    setTimeout(() => {
      this.buySuccess = false;
      this.sellSuccess = false;
    }, 5000);
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
