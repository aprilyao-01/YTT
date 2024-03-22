import { Injectable } from '@angular/core';
import { Portfolio } from '../shared/models/Portfolio';
import { PortfolioItem } from '../shared/models/PortfolioItem';
import { sample_portfolio } from '../../data';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private portfolio: Portfolio = new Portfolio();
  private portfolioSubject: BehaviorSubject<Portfolio> = new BehaviorSubject(this.portfolio);

  constructor() { }

  getAll(): Portfolio {
    return sample_portfolio;
  }

  changeQuantity(increment: number, ticker: string) {
    let inPortfolioItem = this.portfolio.stock.find(item => item.ticker === ticker);
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

  }

  setColor(portfolioItem: PortfolioItem): void {
    let change = portfolioItem.totalCost / portfolioItem.quantity - portfolioItem.c;
    if(change > 0) portfolioItem.color = 'text-success';
    else if(change < 0) portfolioItem.color = 'text-danger';
    else portfolioItem.color = 'text-dark';
  }
}
