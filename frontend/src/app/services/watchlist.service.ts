import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, sample } from 'rxjs';
import { Stock } from '../shared/models/Stock';
import { WatchlistItem } from '../shared/models/WatchlistItem';
import { HttpClient } from '@angular/common/http';
import { WATCHLIST_URL } from '../shared/constants/urls';
import { sample_watchlist } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlist: WatchlistItem[] = this.getWatchlistToLocalStorage();
  private watchlistSubject: BehaviorSubject<WatchlistItem[]> = new BehaviorSubject(this.watchlist);

  constructor(private http: HttpClient) { }

  getSampleWatchlist(): WatchlistItem[] {
    return sample_watchlist;
  }
  
  getAll(): Observable<WatchlistItem[]> {
    return this.http.get<WatchlistItem[]>(WATCHLIST_URL);
  }

  isWatched(ticker:string): boolean {
    let watchItem = this.watchlist.find(item => item.ticker === ticker);
    return watchItem? true : false;
  }

  addToWatchlist(stock: Stock): void {
    let watchItem = this.watchlist.find(item => item.ticker === stock.ticker);
    if(watchItem) return; // already watched

    // update
    this.watchlist.push(new WatchlistItem(stock.name, stock.ticker, stock.c, stock.d, stock.dp));
    this.setWatchlistToLocalStorage();
  }

  removeFromWatchlist(ticker: string): void {
    console.log('server removeFromWatchlist', ticker);
    this.watchlist = this.watchlist.filter(item => item.ticker != ticker);
    this.setWatchlistToLocalStorage();
  }

  getWatchlistObservable():Observable<WatchlistItem[]> {
    return this.watchlistSubject.asObservable();
  }

  private setWatchlistToLocalStorage():void {
    const watchlistJson = JSON.stringify(this.watchlist);
    localStorage.setItem('Watchlist', watchlistJson);
    // broadcast to subscriber
    this.watchlistSubject.next(this.watchlist);
  }

  private getWatchlistToLocalStorage():WatchlistItem[] {
    const watchlistJson = localStorage.getItem('Watchlist');
    return watchlistJson? JSON.parse(watchlistJson) : [];
  }

  setColor(watchItem: WatchlistItem): void {
    if(watchItem.d > 0) watchItem.color = 'text-success';
    else if(watchItem.d < 0) watchItem.color = 'text-danger';
    else watchItem.color = 'text-dark';
  }
}
