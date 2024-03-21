import { Component } from '@angular/core';
import { Portfolio, PortfolioStock } from '../../../shared/models/Portfolio';
import { PortfolioService } from '../../../services/portfolio.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  portfolio: Portfolio = new Portfolio();
  constructor(private portfolioService: PortfolioService, activatedRoute:ActivatedRoute) {
    // activatedRoute.params.subscribe((params) => {
    //   if(params.ticker)
    //   this.stock = this.stockService.getInfoByTicker(params.ticker);
    //   else
    //   this.stock = stockService.getSample();
    // })
    this.portfolio = portfolioService.getAll();
  }

  calculateMarketValue(item: PortfolioStock): string {
    return (item.c * item.quantity).toFixed(2);
  }
  calculateAvgValue(item: PortfolioStock): string {
    return (item.totalCost / item.quantity).toFixed(2);
  }
  calculateChangeValue(item: PortfolioStock): string {
    return (item.totalCost / item.quantity - item.c).toFixed(2);
  }
}
