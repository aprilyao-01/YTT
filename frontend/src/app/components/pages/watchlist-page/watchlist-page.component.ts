import { Component } from '@angular/core';
import { WatchlistService } from '../../../services/watchlist.service';
import { WatchlistItem } from '../../../shared/models/WatchlistItem';

@Component({
  selector: 'app-watchlist-page',
  templateUrl: './watchlist-page.component.html',
  styleUrl: './watchlist-page.component.css'
})
export class WatchlistPageComponent {
  watchlist: WatchlistItem[] = [];
  constructor(private watchlistService: WatchlistService) {
    this.watchlistService.getWatchlistObservable().subscribe(watchItems => {
      this.watchlist = watchItems;
    })
    console.log('Current watchlist in page.ts:', this.watchlist);
  }

  removeFromWatchlist(ticker: string) {
    console.log('removeFromWatchlist', ticker);
    //update UI
    this.watchlist = this.watchlist.filter(item => item.ticker != ticker);
    //update server
    this.watchlistService.removeFromWatchlist(ticker);
  }
}
