import { Injectable } from '@angular/core';
import { CurrentPrice, Profile, Stock, StockV2 } from '../shared/models/Stock';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, forkJoin, of } from 'rxjs';
import { PEERS_URL, PROFILE_URL, QUOTE_URL, SEARCH_URL } from '../shared/constants/urls';
import axios from 'axios';
import { CurrencyPipe } from '@angular/common';
import { catchError, finalize, map } from 'rxjs/operators';
// import { sample_stockV2 } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private stockV2: StockV2 = this.getStockFromLocalV2();
  private stockSubjectV2: BehaviorSubject<StockV2> = new BehaviorSubject(this.stockV2);

  // for passing state to components
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private stockDataSubject = new BehaviorSubject<StockV2 | null>(null);
  private errorSubject = new BehaviorSubject<any>(null);

  loading$ = this.loadingSubject.asObservable();
  stockData$ = this.stockDataSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private http:HttpClient) { }

  loadStockData(ticker: string): void {
    console.log("Loading stock data for: ", ticker);
    this.loadingSubject.next(true);
    forkJoin({
      profile: this.getProfileV2(ticker),
      quote: this.getQuoteV2(ticker),
      peers: this.getPeersV2(ticker),
    })
    .pipe(
      catchError(error => {
        this.errorSubject.next(error);
        return of(null); // Handle error, possibly nullify the data or handle as per requirement
      }),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(result => {
      if (result) {
        const combinedData = new StockV2(result.profile, result.quote, result.peers);
        this.stockDataSubject.next(combinedData);
        this.errorSubject.next(null);
        this.setStockToLocalV2();
      }
    });
  }

  setLoadingSubject(condition:any){
    this.loadingSubject.next(condition);
  }

  setStockDataSubject(condition:any){
    this.stockDataSubject.next(condition);
  }

  setErrorSubject(condition:any){
    this.errorSubject.next(condition);
  }

  // getInfoByTickerV2(ticker:string): void{
  //   if(ticker === 'home'){
  //     this.stockV2 = new StockV2();
  //   } else {
  //     this.getProfileV2(ticker);
  //     this.getQuoteV2(ticker);
  //     this.getPeersV2(ticker);
  //   }
  //   this.setStockToLocalStorageV2();
  // }

  getProfileV2(ticker: string): Observable<any> {
    // Assuming PROFILE_URL is defined and correct
    return this.http.get(PROFILE_URL + ticker);
  }

  getQuoteV2(ticker: string): Observable<any> {
    // Assuming QUOTE_URL is defined and correct
    return this.http.get(QUOTE_URL + ticker);
  }

  getPeersV2(ticker: string): Observable<any> {
    // Assuming PEERS_URL is defined and correct
    return this.http.get(PEERS_URL + ticker);
  }

  // getStockObservableV2():Observable<StockV2>{
  //   return this.stockSubjectV2.asObservable();
  // }

  setStockToLocalV2():void {
    if(this.stockV2){
      // localStorage.setItem('marketOpen', JSON.stringify(this.stockV2.currentPrice.markOpen));
      // localStorage.setItem('currentPrice', JSON.stringify(this.stockV2.currentPrice));
      localStorage.setItem('stockV2', JSON.stringify(this.stockV2));
      this.stockSubjectV2.next(this.stockV2);
    } else {
      // localStorage.removeItem('marketOpen');
      // localStorage.removeItem('currentPrice');
      localStorage.removeItem('stockV2');
      // this.stockSubjectV2.next(new StockV2());
    }
  }

  getMarketFromLocal():boolean{
    let data = localStorage.getItem('marketOpen');
    return data ? JSON.parse(data) : false;
  }
  
  getStockFromLocalV2():StockV2{
    let data = localStorage.getItem('stockV2');
    return data ? JSON.parse(data) : new StockV2();
  }
}
