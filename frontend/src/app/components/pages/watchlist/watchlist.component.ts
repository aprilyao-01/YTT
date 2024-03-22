import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Watchlist } from '../../../shared/models/Watchlist';
import { WatchlistService } from '../../../services/watchlist.service';
import { WatchlistItem } from '../../../shared/models/WatchlistItem';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {


  private sample: WatchlistItem[] = [];
  watchlist: Watchlist = new Watchlist(this.sample);
  constructor(private watchlistService: WatchlistService, activatedRoute:ActivatedRoute, private router: Router) {
    // activatedRoute.params.subscribe((params) => {
    //   if(params.ticker)
    //   this.stock = this.stockService.getInfoByTicker(params.ticker);
    //   else
    //   this.stock = stockService.getSample();
    // })
    this.watchlist = watchlistService.getAll();
  }

  removeFromWatchlist(ticker: string) {
    console.log('removeFromWatchlist', ticker);
    //update UI
    this.watchlist.watchedStock = this.watchlist.watchedStock.filter(item => item.ticker != ticker);
    //update server
    this.watchlistService.removeFromWatchlist(ticker);
  }

  // onItemClick(ticker: string) {
  //   this.router.navigateByUrl(`/search/${ticker}`);
  // }
}
