import { Injectable } from '@angular/core';
import { Portfolio } from '../shared/models/Portfolio';
import { PortfolioItem } from '../shared/models/PortfolioItem';
import { BehaviorSubject, Observable } from 'rxjs';
import { PORTFOLIO_URL } from '../shared/constants/urls';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private portfolio: Portfolio = this.getPortfolioFromLocalStorage();
  private portfolioSubject: BehaviorSubject<Portfolio> = new BehaviorSubject(this.portfolio);

  constructor(private http: HttpClient) {
    const localData = this.getPortfolioFromLocalStorage();
    if (localData.portfolioItem && localData.portfolioItem.length > 0) {
      this.portfolio = localData;
      this.portfolioSubject.next(this.portfolio);
    } else {
      this.getAll().subscribe(data => {
        this.portfolio = data;
        this.setPortfolioToLocalStorage();
      });
    }
    console.log('Initial portfolio:', this.portfolio);
  }

  getAll(): Observable<Portfolio> {
    let list = this.http.get<Portfolio>(PORTFOLIO_URL);
    console.log('In Function portfolio:', list);
    return this.http.get<Portfolio>(PORTFOLIO_URL);
  }

  changeQuantity(increment: number, ticker: string) {
    let inPortfolioItem = this.portfolio.portfolioItem.find(item => item.ticker === ticker);
    if (!inPortfolioItem) return;   // not currently in portfolio

    // update
    inPortfolioItem.quantity += increment;
    inPortfolioItem.average = (inPortfolioItem.totalCost / inPortfolioItem.quantity).toFixed(2);
    inPortfolioItem.marketValue = (inPortfolioItem.c * inPortfolioItem.quantity).toFixed(2);
    inPortfolioItem.change = (inPortfolioItem.totalCost / inPortfolioItem.quantity - inPortfolioItem.c).toFixed(2);

    this.setPortfolioToLocalStorage();
  }

  clearPortfolio() {
    this.portfolio = new Portfolio();
    this.setPortfolioToLocalStorage();
  }

  getPortfolioObservable():Observable<Portfolio>{
    return this.portfolioSubject.asObservable();
  }

  private setPortfolioToLocalStorage():void {
    localStorage.setItem('Portfolio', JSON.stringify(this.portfolio));
    this.portfolioSubject.next(this.portfolio);
  }

  private getPortfolioFromLocalStorage():Portfolio {
    let data = localStorage.getItem('Portfolio');
    return data ? JSON.parse(data) : this.http.get<Portfolio>(PORTFOLIO_URL);
  }

  setColor(portfolioItem: PortfolioItem): void {
    let change = portfolioItem.totalCost / portfolioItem.quantity - portfolioItem.c;
    if(change > 0) portfolioItem.color = 'text-success';
    else if(change < 0) portfolioItem.color = 'text-danger';
    else portfolioItem.color = 'text-dark';
  }
}
