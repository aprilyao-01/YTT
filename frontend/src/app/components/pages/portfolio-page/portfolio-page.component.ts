import { Component } from '@angular/core';
import { Portfolio } from '../../../shared/models/Portfolio';
import { PortfolioService } from '../../../services/portfolio.service';
import { ActivatedRoute } from '@angular/router';
import { PortfolioItem } from '../../../shared/models/PortfolioItem';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.css'
})
export class PortfolioPageComponent {
  //for setting alert
  alertVisible: boolean = false;
  alertCondition: string = 'undefined';
  alertTicker: string = '';
  
  portfolio: Portfolio = new Portfolio();
  constructor(private portfolioService: PortfolioService) {
    this.portfolioService.getPortfolioObservable().subscribe(portfolio => {
      this.portfolio = portfolio;
      if(this.portfolio.portfolioItem.length === 0) this.changeAlert('emptyPortfolio');
    })
    console.log('Current portfolio in page.ts:', this.portfolio);
    console.log('Current portfolioItem in service.ts:', this.portfolio.portfolioItem);
  }

  calculateMarketValue(item: PortfolioItem): string {
    return (item.c * item.quantity).toFixed(2);
  }
  calculateAvgValue(item: PortfolioItem): string {
    return (item.totalCost / item.quantity).toFixed(2);
  }
  calculateChangeValue(item: PortfolioItem): string {
    return (item.totalCost / item.quantity - item.c).toFixed(2);
  }

  changeAlert(condition:string, ticker?: string): void {
    this.alertCondition = condition;
    this.alertVisible = true;
    ticker? this.alertTicker = ticker : this.alertTicker = '';
  }
}
