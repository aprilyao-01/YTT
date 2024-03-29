import { Injectable } from '@angular/core';
import { Portfolio } from '../shared/models/Portfolio';
import { PortfolioItem } from '../shared/models/PortfolioItem';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PORTFOLIO_UPDATE_URL, PORTFOLIO_URL } from '../shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { StockV2 } from '../shared/models/Stock';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private portfolio: Portfolio = this.getPortfolioFromLocal();
  private portfolioSubject: BehaviorSubject<Portfolio> = new BehaviorSubject(this.portfolio);
  private alertSubject = new Subject<{condition: string, ticker?: string}>();

  constructor(private http: HttpClient) {
    const localData = this.getPortfolioFromLocal();
    if (localData.portfolioItem && localData.portfolioItem.length > 0) {
      this.portfolio = localData;
      this.portfolioSubject.next(this.portfolio);
    } else {
      this.getAll().subscribe(data => {
        this.portfolio = data;
        this.setPortfolioToLocal();
      });
    }
    // console.log('Initial portfolio:', this.portfolio);
  }

  getAll(): Observable<Portfolio> {
    return this.http.get<Portfolio>(PORTFOLIO_URL);
  }

  buyStock(ticker: string, c:number, name:string, quantity:number, total:number){
    let inPortfolioItem = this.portfolio.portfolioItem.find(item => item.ticker === ticker);
    if (!inPortfolioItem) {
      // add new item
      inPortfolioItem = new PortfolioItem();
      inPortfolioItem.ticker = ticker;
      inPortfolioItem.name = name;
      inPortfolioItem.c = c;
      inPortfolioItem.quantity = quantity;
      inPortfolioItem.totalCost = total;
      inPortfolioItem.average = total / quantity
      inPortfolioItem.marketValue = c * quantity;
      inPortfolioItem.change = inPortfolioItem.average - c;
      if(inPortfolioItem.change > 0) {
        inPortfolioItem.color = 'text-success';
      } else if(inPortfolioItem.change < 0) {
        inPortfolioItem.color = 'text-danger';
      } else {
        inPortfolioItem.color = 'text-dark';
      }
      
      this.portfolio.portfolioItem.push(inPortfolioItem);
      console.log('New item added:', inPortfolioItem);
    } else {
      this.changeQuantity(quantity, ticker);
    }

    this.portfolio.balance -= total;
    this.changeAlert('buySuccess', ticker);
    this.setPortfolioToLocal();
    this.portfolioSubject.next(this.portfolio);
  }

  sellStock(ticker:string, quantity:number, total:number): boolean {
    let inPortfolioItem = this.portfolio.portfolioItem.find(item => item.ticker === ticker);
    if (!inPortfolioItem) return false;   // not currently in portfolio

    if (inPortfolioItem.quantity < quantity) return false;   // insufficient quantity

    // update
    this.changeQuantity(-quantity, ticker);
    this.changeAlert('sellSuccess', ticker);

    this.portfolio.balance += total;
    this.setPortfolioToLocal();
    this.portfolioSubject.next(this.portfolio);
    console.log('Stock sold:', inPortfolioItem);
    return true;
  }

  changeQuantity(increment: number, ticker: string) {
    let inPortfolioItem = this.portfolio.portfolioItem.find(item => item.ticker === ticker);
    if (!inPortfolioItem) return;   // not currently in portfolio

    // update
    inPortfolioItem.quantity += increment;
    if(inPortfolioItem.quantity === 0) {
      this.portfolio.portfolioItem = this.portfolio.portfolioItem.filter(item => item.ticker != ticker);
    }
    inPortfolioItem.average = inPortfolioItem.totalCost / inPortfolioItem.quantity;
    inPortfolioItem.marketValue = inPortfolioItem.c * inPortfolioItem.quantity;
    const change = (inPortfolioItem.totalCost / inPortfolioItem.quantity - inPortfolioItem.c);
    inPortfolioItem.change = change;
    inPortfolioItem.color = change > 0 ? 'text-success' : change < 0 ? 'text-danger' : 'text-dark';
    console.log('Quantity changed:', inPortfolioItem);
  }

  isHold(ticker:string): boolean {
    let holdItem = this.portfolio.portfolioItem.find(item => item.ticker === ticker);
    return holdItem? true : false;
  }

  getPortfolioObservable():Observable<Portfolio>{
    return this.portfolioSubject.asObservable();
  }

  getBalance():number {
    return this.portfolio.balance;
  }

  getHoldingQuantity(ticker: string): number {
    let holdItem = this.portfolio.portfolioItem.find(item => item.ticker === ticker);
    return holdItem? holdItem.quantity : 0;
  }

  changeAlert(condition: string, ticker?: string): void {
    console.log('Alert:', condition, ticker);
    this.alertSubject.next({condition, ticker});
  }

  getAlertObservable(): Observable<{condition: string, ticker?: string}> {
    return this.alertSubject.asObservable();
  }

  updateInDB(portfolio: Portfolio): Observable<any> {
    return this.http.post(PORTFOLIO_UPDATE_URL, portfolio);
  }

  private setPortfolioToLocal():void {
    const portfolioJson = JSON.stringify(this.portfolio);
    localStorage.setItem('Portfolio', portfolioJson);
    console.log('Portfolio updated:', this.portfolio);

    // update in database
    this.updateInDB(this.portfolio).subscribe({
      next: (response) => console.log(response.message),
      error: (error) => console.error('Failed to update portfolio in database', error)
    });
  }

  private getPortfolioFromLocal():Portfolio {
    let data = localStorage.getItem('Portfolio');
    // console.log('Local portfolio:', data);
    // console.log('DB portfolio:',  this.http.get<Portfolio>(PORTFOLIO_URL));
    return data ? JSON.parse(data) : this.http.get<Portfolio>(PORTFOLIO_URL);
  }
}
