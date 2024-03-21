import { Component } from '@angular/core';
import { Stock } from '../../../shared/models/Stock';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from '../../../services/watchlist.service';
import { sample_stock } from '../../../../data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  stock: Stock = sample_stock[0];
  isInWatchlist: boolean = false;


  constructor(private stockService: StockService, activatedRoute:ActivatedRoute, 
    private watchlistService: WatchlistService, private router: Router) {
    
    activatedRoute.params.subscribe((params) => {
      if(params.ticker)
      this.stock = this.stockService.getInfoByTicker(params.ticker);
      else
      this.stock = stockService.getSample();
    })
  }

  toggleToWatchlist(): void{
    this.isInWatchlist = this.watchlistService.isWatched(this.stock.ticker);
    this.isInWatchlist? this.watchlistService.removeFromWatchlist(this.stock.ticker) : this.watchlistService.addToWatchlist(this.stock);
  }

  // addToWatchlist(): void {
  //   this.watchlistService.addToWatchlist(this.stock);
  //   // this.router.navigateByUrl('/add');
  // }
}
