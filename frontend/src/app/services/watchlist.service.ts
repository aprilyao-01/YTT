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
  private watchlist: WatchlistItem[] = this.getWatchlistFromLocalStorage();
  private watchlistSubject: BehaviorSubject<WatchlistItem[]> = new BehaviorSubject(this.watchlist);

  constructor(private http: HttpClient) {
    const localData = this.getWatchlistFromLocalStorage();
    if (localData.length > 0) {
      this.watchlist = localData;
      // console.log('Initial watchlist 0:', this.watchlist);
    } else {
      this.getAll().subscribe(data => {
        this.watchlist = data;
        this.setWatchlistToLocalStorage();
      });
      // console.log('Initial watchlist: 1', this.watchlist);
    }
  }

  getSampleWatchlist(): WatchlistItem[] {
    return sample_watchlist;
  }
  
  getAll(): Observable<WatchlistItem[]> {
    // let list = this.http.get<WatchlistItem[]>(WATCHLIST_URL);
    // console.log('In Function watchlist:', list);
    return this.http.get<WatchlistItem[]>(WATCHLIST_URL);
  }

  isWatched(ticker:string): boolean {
    // console.log('Current watchlist:', this.watchlist);
    let watchItem = this.watchlist.find(item => item.ticker === ticker);
    return watchItem? true : false;
  }

  addToWatchlist(stock: Stock): void {
    let watchItem = this.watchlist.find(item => item.ticker === stock.ticker);
    if(watchItem) return; // already watched

    // update
    this.watchlist.push(new WatchlistItem(stock.name, stock.ticker, stock.c, stock.d, stock.dp));
    this.setWatchlistToLocalStorage();
    // console.log('server addToWatchlist', stock.ticker);
  }

  removeFromWatchlist(ticker: string): void {
    // console.log('server removeFromWatchlist', ticker);
    this.watchlist = this.watchlist.filter(item => item.ticker != ticker);
    this.setWatchlistToLocalStorage();
  }

  getWatchlistObservable():Observable<WatchlistItem[]> {
    return this.watchlistSubject.asObservable();
  }

  updateWatchlistInDatabase(watchlist: WatchlistItem[]): Observable<any> {
    return this.http.post(`${WATCHLIST_URL}/update`, watchlist);
  }  

  private setWatchlistToLocalStorage():void {
    const watchlistJson = JSON.stringify(this.watchlist);
    localStorage.setItem('Watchlist', watchlistJson);
    // broadcast to subscriber
    this.watchlistSubject.next(this.watchlist);

    // update in database
    this.updateWatchlistInDatabase(this.watchlist).subscribe({
      next: (response) => console.log(response.message),
      error: (error) => console.error('Failed to update watchlist in database', error)
    });
  }

  private getWatchlistFromLocalStorage():WatchlistItem[] {
    const watchlistJson = localStorage.getItem('Watchlist');
    // console.log('watchlistJson from localStorage:', watchlistJson);
    return watchlistJson ? JSON.parse(watchlistJson) : this.http.get<WatchlistItem[]>(WATCHLIST_URL);
  }

  setColor(watchItem: WatchlistItem): void {
    if(watchItem.d > 0) watchItem.color = 'text-success';
    else if(watchItem.d < 0) watchItem.color = 'text-danger';
    else watchItem.color = 'text-dark';
  }
}
