import { Injectable } from '@angular/core';
import { Stock } from '../shared/models/Stock';
import { sample_stock } from '../../data';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SEARCH_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stock: Stock = this.getStockFromLocalStorage();
  private stockSubject: BehaviorSubject<Stock> = new BehaviorSubject(this.stock);

  constructor(private http:HttpClient) { }

  getInfoByTicker(ticker:string): Observable <Stock>{
    return this.http.get<Stock>(SEARCH_URL + ticker);
  }

  setStockToLocalStorage():void {
    localStorage.setItem('stock', JSON.stringify(this.stock));
    this.stockSubject.next(this.stock);
  }

  getStockFromLocalStorage():Stock{
    let data = localStorage.getItem('stock');
    return data ? JSON.parse(data) : new Stock();
  }
}
