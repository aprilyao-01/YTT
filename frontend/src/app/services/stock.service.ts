import { Injectable } from '@angular/core';
import { StockV2 } from '../shared/models/Stock';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { EARNING_URL, INSIDER_URL, NEWS_URL, PEERS_URL, PROFILE_URL, QUOTE_URL, RECOMMENDATION_URL, SEARCH_URL, LASTWORKING_URL, HISTORY_URL } from '../shared/constants/urls';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { format, subDays, parseISO, subYears } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  // for passing state to components
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private stockDataSubject = new BehaviorSubject<StockV2 | null>(null);
  private errorSubject = new BehaviorSubject<any>(null);

  loading$ = this.loadingSubject.asObservable();
  stockData$ = this.stockDataSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private http:HttpClient) { }

  loadStockData(ticker: string): void {
    this.loadingSubject.next(true);
    console.log("Loading for: ", ticker);
    // start by getting the quote
    this.getQuote(ticker).pipe(
      // store then continue
      tap(quote => {
        this.setStockToLocal(quote, 'quote');
      }),
      // switchMap to wait for the first call to complete before proceeding
      switchMap(quote => {
        // get in parallel
        return forkJoin({
          profile: this.getProfile(ticker),
          peers: this.getPeers(ticker),
          lastworking: this.getLastworking(ticker),
          quote: of(quote), // pass the already retrieved quote forward
        });
      }),
      catchError(error => {
        this.errorSubject.next(error);
        return of(null); // Handle error, possibly nullify the data or handle as per requirement
      }),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(result => {
      if (result) {
        const combinedData = new StockV2(result.profile, result.quote);
        this.stockDataSubject.next(combinedData); // Send the result back
        this.errorSubject.next(null);

        this.setStockToLocal(result.profile, 'profile');
        this.setStockToLocal(result.peers, 'peers');
        this.setStockToLocal(result.lastworking, 'lastworking');

        console.log("First part Done");

        // then get the rest
        this.fetchOthers(ticker);
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

  private fetchOthers(ticker: string): void {
    forkJoin({
      news: this.getNews(ticker),
      history: this.getHistory(ticker),
      insider: this.getInsider(ticker),
      recommendation: this.getRecommendation(ticker),
      earnings: this.getEarings(ticker),
    }).pipe(
      catchError(error => {
        this.errorSubject.next(error);
        return of(null); // Handle error, possibly nullify the data or handle as per requirement
      }),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(result => {
      if (result) {
        const stockData = this.stockDataSubject.getValue();
        if(stockData){
          stockData.news = result.news;
          stockData.insider = result.insider;
        }
        
        this.stockDataSubject.next(stockData);
        this.errorSubject.next(null);

        console.log("Second part Done");

        // store each part in localStorage
        this.setStockToLocal(result.news, 'news');
        this.setStockToLocal(result.history, 'history');
        this.setStockToLocal(result.insider, 'insider');
        this.setStockToLocal(result.recommendation, 'recommendation');
        this.setStockToLocal(result.earnings, 'earnings');
      }
    });
  }

  getUpdate(ticker: string): Observable<StockV2 | null> {
    console.log("Update for: ", ticker);

    return forkJoin({
      quote: this.getQuote(ticker),
      // lastworking: this.getLastworking(ticker),
    })
    .pipe(
      catchError(error => {
        this.errorSubject.next(error);
        return of(null); // Handle error, possibly nullify the data or handle as per requirement
      }),
      map(result => {
        if (result) {
          const profile = this.getStockFromLocal('profile');
          const combinedData = new StockV2(profile, result.quote);
  
          this.stockDataSubject.next(combinedData); // Update observable with new data
          this.errorSubject.next(null);
  
          this.setStockToLocal(result.quote, 'quote');
          // this.setStockToLocal(result.lastworking, 'lastworking');
  
          return combinedData; // Return the combined data
        }
        return null; // Return null if there's an error or if result is empty
      })
    );
  }

  // tab summary
  getProfile(ticker: string): Observable<any> {
    return this.http.get(PROFILE_URL + ticker);
  }

  getQuote(ticker: string): Observable<any> {
    return this.http.get(QUOTE_URL + ticker);
  }

  getPeers(ticker: string): Observable<any> {
    return this.http.get(PEERS_URL + ticker);
  }

  getLastworking(ticker: string): Observable<any> {
    let localQuote = this.getStockFromLocal('quote');

    let to: Date;
    // if market is open, 'to' is today. if market is closed, 'to' is the last trading day.
    to = localQuote.markOpen ? new Date() : parseISO(localQuote.lastTimestamp.split(' ')[0]);
    const from = subDays(to, 1); // 'from' is always one day before 'to'

    const formattedFrom = format(from, 'yyyy-MM-dd');
    const formattedTo = format(to, 'yyyy-MM-dd');

    return this.http.get(`${LASTWORKING_URL}${ticker}/${formattedFrom}/${formattedTo}`);
  }

  // tab chart
  getHistory(ticker: string): Observable<any> {
    const to = new Date();
    const from = subYears(to, 2); // 2 years data

    const formattedFrom = format(from, 'yyyy-MM-dd');
    const formattedTo = format(to, 'yyyy-MM-dd');

    return this.http.get(`${HISTORY_URL}${ticker}/${formattedFrom}/${formattedTo}`);
  }

  // tab news
  getNews(ticker: string): Observable<any> {
    return this.http.get(NEWS_URL + ticker);
  }


  // tab insights
  getInsider(ticker:string):Observable<any>{
    return this.http.get(INSIDER_URL + ticker);
  }

  getRecommendation(ticker:string):Observable<any>{
    return this.http.get(RECOMMENDATION_URL + ticker);
  }

  getEarings(ticker:string):Observable<any>{
    return this.http.get(EARNING_URL + ticker);
  }

  isMarketOpen(): boolean {
    return this.getStockFromLocal('quote').markOpen;
  }

  clearStockLocal(){
    localStorage.removeItem('profile');
    localStorage.removeItem('quote');
    localStorage.removeItem('peers');
    localStorage.removeItem('news');
    localStorage.removeItem('insider');
    localStorage.removeItem('recommendation');
    localStorage.removeItem('earnings');
    localStorage.removeItem('lastworking');
    localStorage.removeItem('history');
  }

  private setStockToLocal(data: any, key: string): void {
    const dataJson = JSON.stringify(data);
    localStorage.setItem(key, dataJson);
  }
  
  getStockFromLocal(key: string): any{
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}
