import { Injectable } from '@angular/core';
import { Watchlist } from '../shared/models/Watchlist';
import { BehaviorSubject, Observable } from 'rxjs';
import { Stock } from '../shared/models/Stock';
import { WatchlistItem } from '../shared/models/WatchlistItem';
import { HttpClient } from '@angular/common/http';
import { WATCHLIST_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlist:Watchlist = this.getWatchlistToLocalStorage();
  private watchlistSubject: BehaviorSubject<Watchlist> = new BehaviorSubject(this.watchlist);

  constructor(private http: HttpClient) { }

  getAll(): Observable<Watchlist> {
    return this.http.get<Watchlist>(WATCHLIST_URL);
  }

  isWatched(ticker:string): boolean {
    let watchItem = this.watchlist.watchItem.find(item => item.ticker === ticker);
    return watchItem? true : false;
  }

  addToWatchlist(stock: Stock): void {
    let watchItem = this.watchlist.watchItem.find(item => item.ticker === stock.ticker);
    if(watchItem) return; // already watched

    // update
    this.watchlist.watchItem.push(new WatchlistItem(stock.name, stock.ticker, stock.c, stock.d, stock.dp));
    this.setWatchlistToLocalStorage();
  }

  removeFromWatchlist(ticker: string): void {
    console.log('server removeFromWatchlist', ticker);
    this.watchlist.watchItem = this.watchlist.watchItem.filter(item => item.ticker != ticker);
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

  setColor(watchItem: WatchlistItem): void {
    if(watchItem.d > 0) watchItem.color = 'text-success';
    else if(watchItem.d < 0) watchItem.color = 'text-danger';
    else watchItem.color = 'text-dark';
  }
}
