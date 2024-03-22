import { Injectable } from '@angular/core';
import { Stock } from '../shared/models/Stock';
import { sample_stock } from '../../data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SEARCH_URL, STOCK_SAMPLE_URL, STOCK_SINGLE_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http:HttpClient) { }

  getAll(): Observable <Stock[]> {
    return this.http.get<Stock[]>(STOCK_SAMPLE_URL);
  }

  getSample(): Observable <Stock> {
    return this.http.get<Stock>(STOCK_SINGLE_URL);
  }

  getInfoByTicker(ticker:string): Observable <Stock>{
    return this.http.get<Stock>(SEARCH_URL + ticker);
    // return this.getAll().find(stock => stock.ticker === ticker.toUpperCase()) ?? new Stock();
  }

  private setStockToLocalStorage():void {
    
  }
}
