import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Watchlist } from '../../../shared/models/Watchlist';
import { WatchlistService } from '../../../services/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
  watchlist: Watchlist[] = [];
  constructor(private watchlistService: WatchlistService, activatedRoute:ActivatedRoute) {
    // activatedRoute.params.subscribe((params) => {
    //   if(params.ticker)
    //   this.stock = this.stockService.getInfoByTicker(params.ticker);
    //   else
    //   this.stock = stockService.getSample();
    // })
    this.watchlist = watchlistService.getAll();
  }
}
