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

  stockV2!: StockV2;

  isLoading: boolean = false;

  constructor(private stockService: StockService, private activatedRoute: ActivatedRoute,
    private watchlistService: WatchlistService, private router: Router) {
      this.stockService.getStockObservableV2().subscribe((serverStock) => {
        this.stockV2 = serverStock;
      });

      this.activatedRoute.params.subscribe((params) => {
        if(params.ticker && params.ticker!='home') {
          this.search(params.ticker);
        }
      });
}

  toggleToWatchlist(): void{
    this.isInWatchlist = this.watchlistService.isWatched(this.stockV2.profile.ticker);
    // this.isInWatchlist? this.watchlistService.removeFromWatchlist(this.stockV2.profile.ticker) : this.watchlistService.addToWatchlist(this.stockV2);
    this.isInWatchlist = !this.isInWatchlist;
  }

  search(ticker: string): void {
    this.currentTicker = ticker;
    this.router.navigateByUrl('/search/' + ticker);
    this.stockService.getInfoByTickerV2(ticker);
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
