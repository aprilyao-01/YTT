import { Component } from '@angular/core';
import { Portfolio } from '../../../shared/models/Portfolio';
import { PortfolioService } from '../../../services/portfolio.service';

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
  triggerCounter: number = 0;
  
  portfolio: Portfolio = new Portfolio();
  constructor(private portfolioService: PortfolioService) {
    
    this.portfolioService.getPortfolioObservable().subscribe(portfolio => {
      this.portfolio = portfolio;
      if(this.portfolio.portfolioItem.length === 0) this.changeAlert('emptyPortfolio');
    })

    this.portfolioService.getAlertObservable().subscribe(alertData => {
      this.changeAlert(alertData.condition, alertData.ticker);
    });
  }

  changeAlert(condition:string, ticker?: string): void {
    this.triggerCounter++;
    this.alertCondition = condition;
    this.alertVisible = true;
    ticker? this.alertTicker = ticker : this.alertTicker = '';
  }
}
