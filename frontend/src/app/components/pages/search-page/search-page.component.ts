import { Component } from '@angular/core';
import { sample_stock } from '../../../../data';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from '../../../services/watchlist.service';
import { Observable } from 'rxjs';
import { Stock } from '../../../shared/models/Stock';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  stock: Stock = sample_stock[-1];
  isInWatchlist: boolean = false;


  constructor(private stockService: StockService, activatedRoute:ActivatedRoute,
    private watchlistService: WatchlistService, private router: Router) {
    let stockObservable: Observable<Stock>;
    activatedRoute.params.subscribe((params) => {
      if(params.ticker)
        stockObservable = this.stockService.getInfoByTicker(params.ticker);
      // else
      //   stockObservable = stockService.getSample();

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
}
