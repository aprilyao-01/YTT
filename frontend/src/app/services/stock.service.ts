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

  private stockV2: StockV2 = this.getStockFromLocalStorageV2();
  private stockSubjectV2: BehaviorSubject<StockV2> = new BehaviorSubject(this.stockV2);

  constructor(private http:HttpClient) { }

  getInfoByTickerV2(ticker:string): void{
    if(ticker === 'home'){
      this.stockV2 = new StockV2();
    } else {
      this.getProfileV2(ticker);
      this.getQuoteV2(ticker);
      this.getPeersV2(ticker);
    }
    this.setStockToLocalStorageV2();
  }

  getProfileV2(ticker:string){
    axios.get(PROFILE_URL + ticker).then(data => {
      this.stockV2.profile = data.data;
    })
    console.log("Profile: ",this.http.get<Profile>(PROFILE_URL + ticker));
  }

  getQuoteV2(ticker:string){
    axios.get(QUOTE_URL + ticker).then(data => {
      this.stockV2.currentPrice = data.data;
    });
  }

  getPeersV2(ticker:string){
    axios.get(PEERS_URL + ticker).then(data => {
      this.stockV2.peers = data.data;
    });
  }

  getStockObservableV2():Observable<StockV2>{
    return this.stockSubjectV2.asObservable();
  }

  setStockToLocalStorageV2():void {
    localStorage.setItem('stockV2', JSON.stringify(this.stockV2));
    this.stockSubjectV2.next(this.stockV2);
  }

  getStockFromLocalStorageV2():StockV2{
    let data = localStorage.getItem('stockV2');
    return data ? JSON.parse(data) : new StockV2();
  }
}
