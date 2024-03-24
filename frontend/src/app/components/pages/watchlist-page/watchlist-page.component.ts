import { Component } from '@angular/core';
import { Watchlist } from '../../../shared/models/Watchlist';
import { WatchlistService } from '../../../services/watchlist.service';

@Component({
  selector: 'app-watchlist-page',
  templateUrl: './watchlist-page.component.html',
  styleUrl: './watchlist-page.component.css'
})
export class WatchlistPageComponent {
  watchlist!: Watchlist;
  constructor(private watchlistService: WatchlistService) {
    this.watchlistService.getWatchlistObservable().subscribe(watchlist => {
      this.watchlist = watchlist;
    })
  }

  removeFromWatchlist(ticker: string) {
    console.log('removeFromWatchlist', ticker);
    //update UI
    this.watchlist.watchItem = this.watchlist.watchItem.filter(item => item.ticker != ticker);
    //update server
    this.watchlistService.removeFromWatchlist(ticker);
  }
}
