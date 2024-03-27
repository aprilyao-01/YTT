import { Component } from '@angular/core';
import { sample_stock, sample_stockV2 } from '../../../../data';
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
export class SearchPageComponent {
  //for setting alert
  alertVisible: boolean = false;
  alertCondition: string = 'undefined';
  alertTicker: string = '';

  stock: Stock = sample_stock[-1];
  isInWatchlist: boolean = false;
  currentTicker: string = 'home';

  stockV2: StockV2 =  new StockV2(); // Use a spread to ensure a separate copy


  // constructor(private stockService: StockService, activatedRoute:ActivatedRoute,
  //   private watchlistService: WatchlistService, private router: Router) {
  //   let stockObservableV2: Observable<StockV2>;
  //   activatedRoute.params.subscribe(async(params) => {
  //     if(params.ticker)
  //       stockObservableV2 = this.stockService.getInfoByTickerV2(params.ticker);
  //     // else
  //     //   stockObservableV2 = stockService.getStockFromLocalStorageV2();

  //     stockObservableV2.subscribe((serverStock) => {
  //       this.stockV2 = serverStock;
  //       // this.isInWatchlist = watchlistService.isWatched(serverStock.profile.ticker);
  //     })
  //   })

  // }

  constructor(private stockService: StockService, activatedRoute: ActivatedRoute,
    private watchlistService: WatchlistService, private router: Router) {
  activatedRoute.params.subscribe(params => {
    if(params.ticker) {
      this.stockService.getInfoByTickerV2(params.ticker).subscribe((serverStock) => {
        this.stockV2 = serverStock;
        // Additional logic here
      });
    }
  });
}

  toggleToWatchlist(): void{
    this.isInWatchlist = this.watchlistService.isWatched(this.stock.ticker);
    console.log('isInWatchlist:', this.isInWatchlist);
    this.isInWatchlist? this.watchlistService.removeFromWatchlist(this.stock.ticker) : this.watchlistService.addToWatchlist(this.stock);
    this.isInWatchlist = !this.isInWatchlist;
  }

  search(ticker: string): void {
    this.currentTicker = ticker;
    this.router.navigateByUrl('/search/' + ticker);
    
    if(ticker === 'home'){
      console.log('ticker is: ', ticker);
      this.stockV2 = new StockV2();
    }
    // this.stockService.
  }

  OnNotify(ticker: string): void {
    this.search(ticker)
    // this.router.navigateByUrl('/search/' + ticker);
  }

  changeAlert(condition:string, ticker?: string): void {
    this.alertCondition = condition;
    this.alertVisible = true;
    ticker? this.alertTicker = ticker : this.alertTicker = '';
  }
}
