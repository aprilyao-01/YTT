import { Injectable } from '@angular/core';
import { Watchlist } from '../shared/models/Watchlist';
import { sample_stock, sample_watchlist } from '../../data';
import { BehaviorSubject, Observable } from 'rxjs';
import { Stock } from '../shared/models/Stock';
import { WatchlistItem } from '../shared/models/WatchlistItem';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlist:Watchlist = this.getWatchlistToLocalStorage();
  private watchlistSubject: BehaviorSubject<Watchlist> = new BehaviorSubject(this.watchlist);

  constructor() { }

  getAll(): Watchlist {
    return sample_watchlist;
  }

  isWatched(ticker:string): boolean {
    let watchItem = this.watchlist.watchedStock.find(item => item.ticker === ticker);
    return watchItem? true : false;
  }

  addToWatchlist(stock: Stock): void {
    let watchItem = this.watchlist.watchedStock.find(item => item.ticker === stock.ticker);
    if(watchItem) return; // already watched

    // update
    this.watchlist.watchedStock.push(new WatchlistItem(stock.name, stock.ticker, stock.c, stock.d, stock.dp));
    this.setWatchlistToLocalStorage();
  }

  removeFromWatchlist(ticker: string): void {
    this.watchlist.watchedStock = this.watchlist.watchedStock.filter(item => item.ticker != ticker);
    this.setWatchlistToLocalStorage();
  }

  getWatchlistObservable():Observable<Watchlist> {
    return this.watchlistSubject.asObservable();
  }

  private setWatchlistToLocalStorage():void {
    const watchlistJson = JSON.stringify(this.watchlist);
    localStorage.setItem('Watchlist', watchlistJson);
    // broadcast to subscriber
    this.watchlistSubject.next(this.watchlist);
  }

  private getWatchlistToLocalStorage():Watchlist {
    const watchlistJson = localStorage.getItem('Watchlist');
    return watchlistJson? JSON.parse(watchlistJson) : new Watchlist([]);
  }
}
