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
      inPortfolioItem.average = (total / quantity).toFixed(2);
      inPortfolioItem.marketValue = (total).toFixed(2);
      const change = (total / quantity - c);
      inPortfolioItem.change = change.toFixed(2);
      if(change > 0) {
        inPortfolioItem.color = 'text-success';
      } else if(change < 0) {
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
  }

  sellStock(ticker:string, quantity:number, total:number): boolean {
    let inPortfolioItem = this.portfolio.portfolioItem.find(item => item.ticker === ticker);
    if (!inPortfolioItem) return false;   // not currently in portfolio

    if (inPortfolioItem.quantity < quantity) return false;   // insufficient quantity

    // update
    this.changeQuantity(-quantity, ticker);

    this.portfolio.balance += total;
    this.setPortfolioToLocal();
    console.log('Stock sold:', inPortfolioItem);
    this.changeAlert('sellSuccess', ticker);
    return true;
  }

  changeQuantity(increment: number, ticker: string) {
    let inPortfolioItem = this.portfolio.portfolioItem.find(item => item.ticker === ticker);
    if (!inPortfolioItem) return;   // not currently in portfolio

    // update
    inPortfolioItem.quantity += increment;
    inPortfolioItem.average = (inPortfolioItem.totalCost / inPortfolioItem.quantity).toFixed(2);
    inPortfolioItem.marketValue = (inPortfolioItem.c * inPortfolioItem.quantity).toFixed(2);
    inPortfolioItem.change = (inPortfolioItem.totalCost / inPortfolioItem.quantity - inPortfolioItem.c).toFixed(2);

    this.setPortfolioToLocal();
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
    this.alertSubject.next({condition, ticker});
  }

  getAlertObservable(): Observable<{condition: string, ticker?: string}> {
    return this.alertSubject.asObservable();
  }

  updateInDB(portfolio: Portfolio): Observable<any> {
    return this.http.post(PORTFOLIO_UPDATE_URL, portfolio);
  }

  private setPortfolioToLocal():void {
    localStorage.setItem('Portfolio', JSON.stringify(this.portfolio));
    this.portfolioSubject.next(this.portfolio);

    // update in database
    this.updateInDB(this.portfolio).subscribe({
      next: (response) => console.log(response.message),
      error: (error) => console.error('Failed to update portfolio in database', error)
    });
  }

  private getPortfolioFromLocal():Portfolio {
    let data = localStorage.getItem('Portfolio');
    return data ? JSON.parse(data) : this.http.get<Portfolio>(PORTFOLIO_URL);
  }
}
