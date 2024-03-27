import { Injectable } from '@angular/core';
import { CurrentPrice, Profile, Stock, StockV2 } from '../shared/models/Stock';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, forkJoin, of } from 'rxjs';
import { PEERS_URL, PROFILE_URL, QUOTE_URL, SEARCH_URL } from '../shared/constants/urls';
import axios from 'axios';
import { CurrencyPipe } from '@angular/common';
import { catchError, map } from 'rxjs/operators';
import { sample_stockV2 } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stock: Stock = this.getStockFromLocalStorage();
  private stockSubject: Subject<Stock> = new Subject();

  private stockV2: StockV2 = this.getStockFromLocalStorageV2();
  private stockSubjectV2: BehaviorSubject<StockV2> = new BehaviorSubject(this.stockV2);


  profileReadySubject: Subject<boolean> = new Subject();
  latestReadySubject: Subject<boolean> = new Subject();
  newsReadySubject: Subject<boolean> = new Subject();
  recommendationReadySubject: Subject<boolean> = new Subject();
  socialSentimentReadySubject: Subject<boolean> = new Subject();
  peersReadySubject: Subject<boolean> = new Subject();
  earningsReadySubject: Subject<boolean> = new Subject();
  summaryReadySubject: Subject<boolean> = new Subject();
  historyReadySubject: Subject<boolean> = new Subject();

  // for watchlist & portfolio
  latestDataBySymbolReadySubject: Subject<string> = new Subject();

  constructor(private http:HttpClient) {
    // const localData = this.getStockFromLocalStorage();
    // if (localData.ticker) {
    //   this.stock = localData;
    //   this.stockSubject.next(this.stock);
    // }

    // const localDataV2 = this.getStockFromLocalStorageV2();
    // if (localDataV2.profile.ticker) {
    //   this.stockV2 = localDataV2;
    //   this.stockSubjectV2.next(this.stockV2);
    // }
  }

  getInfoByTicker(ticker:string): Observable <Stock>{
    if(ticker === 'home') return new Observable<Stock>(); // return an empty observable
    this.getProfile(ticker);
    // this.getQuote(ticker);
    // this.getPeers(ticker);
    // this.setStockToLocalStorage();
    return this.stockSubject.asObservable();
  }

  getInfoByTickerV2(ticker: string): Observable<StockV2> {
    if (ticker === 'home') return of(new StockV2()); // Return a default object for 'home'
  
    return forkJoin({
      profile: this.getProfileV2(ticker),
      currentPrice: this.getQuoteV2(ticker),
      peers: this.getPeersV2(ticker)
    }).pipe(map(results => {
      const stockV2 = new StockV2();
      stockV2.profile = results.profile; // Use undefined or provide a default Profile object
      stockV2.currentPrice = results.currentPrice; // Use undefined or provide a default CurrentPrice object
      stockV2.peers = results.peers;
    
      // Logic to set `color` based on `currentPrice.d`
      if (stockV2.currentPrice && stockV2.currentPrice.d > 0) {
        stockV2.color = 'text-success';
      } else if (stockV2.currentPrice && stockV2.currentPrice.d < 0) {
        stockV2.color = 'text-danger';
      } else {
        stockV2.color = 'text-dark';
      }
    
      return stockV2;
    }));
  }  

  // getInfoByTickerV2(ticker:string): Observable <StockV2>{    
  //   if(ticker === 'home') return new Observable<StockV2>(); // return an empty observable
  //   this.getProfileV2(ticker);
  //   this.getQuoteV2(ticker);
  //   this.getPeersV2(ticker);
  //   console.log("Stock: ",this.stockV2);
  //   console.log("Stock Subject: ",this.stockSubjectV2);
  //   console.log("Stock Subject type: ",typeof this.stockSubjectV2);
  //   return this.stockSubjectV2.asObservable();
  // }

  // getProfileV2(ticker:string){
  //   axios.get(PROFILE_URL + ticker).then(data => {
  //     this.stockV2.profile = data.data;
  //   })
  //   console.log("Profile: ",this.http.get<Profile>(PROFILE_URL + ticker));
  //   // return this.http.get<Profile>(PROFILE_URL + ticker)
  // }

  getProfile(ticker:string){
    let profile = this.http.get<any>(PROFILE_URL + ticker);
    profile.subscribe(data => {
      console.log(data)
      this.stock.ticker = data.ticker;
      this.stock.name = data.name;
      this.stock.exchange = data.exchange;
      this.stock.ipo = data.ipo;
      this.stock.marketCapitalization = data.marketCapitalization;
      this.stock.logo = data.logo;
      this.stock.weburl = data.weburl;
      this.stock.finnhubIndustry = data.finnhubIndustry;
      localStorage.setItem('profile', JSON.stringify(profile));
    });
    // localStorage.setItem('profile', JSON.stringify(profile));
  }

  getQuote(ticker:string){
    let quote = this.http.get<any>(QUOTE_URL + ticker);
    quote.subscribe(data => {
      this.stock.c = data.c;
      this.stock.d = data.d;
      this.stock.dp = data.dp;
      this.stock.h = data.h;
      this.stock.l = data.l;
      this.stock.o = data.o;
      this.stock.pc = data.pc;
      this.stock.t = data.t;
      if (this.stock.d > 0) {
        this.stock.color = 'text-success';
      } else if (this.stock.d < 0) {
        this.stock.color = 'text-danger';
      } else {  // d == 0
        this.stock.color = 'text-dark';
      }
      // localStorage.setItem('quote', JSON.stringify(quote));
    });
  }

  getPeers(ticker:string){
    let peers = this.http.get<any>(PEERS_URL + ticker);
    peers.subscribe(data => {
      this.stock.peers = data;
      // localStorage.setItem('peers', JSON.stringify(peers));
    });
  }

  // getQuoteV2(ticker:string){
  //   axios.get(QUOTE_URL + ticker).then(data => {
  //     this.stockV2.currentPrice = data.data;
  //     if (this.stockV2.currentPrice.d > 0) {
  //       this.stockV2.color = 'text-success';
  //     } else if (this.stockV2.currentPrice.d < 0) {
  //       this.stockV2.color = 'text-danger';
  //     } else {  // d == 0
  //       this.stockV2.color = 'text-dark';
  //     }
  //   });
  //   // return this.http.get<CurrencyPipe>(QUOTE_URL + ticker)
  // }

  // getPeersV2(ticker:string){
  //   axios.get(PEERS_URL + ticker).then(data => {
  //     this.stockV2.peers = data.data;
  //   });
  //   // return this.http.get<string[]>(PEERS_URL + ticker)
  // }

  getProfileV2(ticker: string): Observable<Profile> {
    return this.http.get<Profile>(PROFILE_URL + ticker)
  }
  
  getQuoteV2(ticker: string): Observable<CurrentPrice> {
    return this.http.get<CurrentPrice>(QUOTE_URL + ticker)
  }
  
  getPeersV2(ticker: string): Observable<string[]> {
    return this.http.get<string[]>(PEERS_URL + ticker)
  }
  

  setStockToLocalStorage():void {
    localStorage.setItem('stock', JSON.stringify(this.stock));
    this.stockSubject.next(this.stock);
  }

  getStockFromLocalStorage():Stock{
    let data = localStorage.getItem('stock');
    return data ? JSON.parse(data) : new Stock();
  }

  getStockFromLocalStorageV2():StockV2{
    let data = localStorage.getItem('stockV2');
    return data ? JSON.parse(data) : new StockV2();
  }
}
