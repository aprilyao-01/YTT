import { Component } from '@angular/core';
import { sample_stock } from '../../../../data';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from '../../../services/watchlist.service';
import { Observable } from 'rxjs';
import { Stock } from '../../../shared/models/Stock';
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


  constructor(private stockService: StockService, activatedRoute:ActivatedRoute,
    private watchlistService: WatchlistService, private router: Router) {
    let stockObservable: Observable<Stock>;
    activatedRoute.params.subscribe(async (params) => {
      if(params.ticker)
        stockObservable = this.stockService.getInfoByTicker(params.ticker);
      // this.changeAlert('noInput', 'AAPL');
      // await new Promise(f => setTimeout(f, 3000));
      // this.changeAlert('notFound');

      // else
      //   stockObservable = stockService.getStockFromLocalStorage();

      stockObservable.subscribe((serverStock) => {
        this.stock = serverStock;
        this.isInWatchlist = watchlistService.isWatched(serverStock.ticker);
        this.stockService.setStockToLocalStorage();
      })
    })
  }

  toggleToWatchlist(): void{
    this.isInWatchlist = this.watchlistService.isWatched(this.stock.ticker);
    console.log('isInWatchlist:', this.isInWatchlist);
    this.isInWatchlist? this.watchlistService.removeFromWatchlist(this.stock.ticker) : this.watchlistService.addToWatchlist(this.stock);
    this.isInWatchlist = !this.isInWatchlist;
  }

  search(ticker: string): void {
    this.router.navigateByUrl('/search/' + ticker);
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
