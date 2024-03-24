import { Injectable } from '@angular/core';
import { Stock } from '../shared/models/Stock';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { PEERS_URL, PROFILE_URL, QUOTE_URL, SEARCH_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stock: Stock = this.getStockFromLocalStorage();
  private stockSubject: BehaviorSubject<Stock> = new BehaviorSubject(this.stock);

  constructor(private http:HttpClient) {
    // const localData = this.getStockFromLocalStorage();
    // if (localData.ticker) {
    //   this.stock = localData;
    //   this.stockSubject.next(this.stock);
    // }
  }

  getInfoByTicker(ticker:string): Observable <Stock>{
    // this.getProfile(ticker);
    // this.getQuote(ticker);
    this.getPeers(ticker);
    // this.setStockToLocalStorage();
    return this.stockSubject.asObservable();
  }

  getProfile(ticker:string){
    let profile = this.http.get<any>(PROFILE_URL + ticker);
    profile.subscribe(data => {
      this.stock.ticker = data.ticker;
      this.stock.name = data.name;
      this.stock.exchange = data.exchange;
      this.stock.ipo = data.ipo;
      this.stock.marketCapitalization = data.marketCapitalization;
      this.stock.logo = data.logo;
      this.stock.weburl = data.weburl;
      this.stock.finnhubIndustry = data.finnhubIndustry;
      // localStorage.setItem('profile', JSON.stringify(profile));
    });
    
  }

  // getQuote(ticker:string){
  //   let quote = this.http.get<any>(QUOTE_URL + ticker);
  //   quote.subscribe(data => {
  //     this.stock.c = data.c;
  //     this.stock.d = data.d;
  //     this.stock.dp = data.dp;
  //     this.stock.h = data.h;
  //     this.stock.l = data.l;
  //     this.stock.o = data.o;
  //     this.stock.pc = data.pc;
  //     this.stock.t = data.t;
  //     if (this.stock.d > 0) {
  //       this.stock.color = 'text-success';
  //     } else if (this.stock.d < 0) {
  //       this.stock.color = 'text-danger';
  //     } else {  // d == 0
  //       this.stock.color = 'text-dark';
  //     }
  //     // localStorage.setItem('quote', JSON.stringify(quote));
  //   });
  // }

  getPeers(ticker:string){
    let peers = this.http.get<any>(PEERS_URL + ticker);
    peers.subscribe(data => {
      this.stock.peers = data;
      // localStorage.setItem('peers', JSON.stringify(peers));
    });
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
