import { Injectable } from '@angular/core';
import { Watchlist } from '../shared/models/Watchlist';
import { sample_watchlist } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor() { }

  getAll(): Watchlist[] {
    return sample_watchlist;
  }
}
