import { Injectable } from '@angular/core';
import { Stock } from '../shared/models/Stock';
import { sample_stock } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor() { }

  getAll(): Stock[] {
    return sample_stock;
  }

  getSample(): Stock {
    return sample_stock[0];
  }

  getInfoByTicker(ticker:string): Stock{
    return this.getAll().find(stock => stock.ticker === ticker.toUpperCase()) ?? new Stock();
  }

  private setStockToLocalStorage():void {
    
  }
}
