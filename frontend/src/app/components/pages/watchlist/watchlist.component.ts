import { Component } from '@angular/core';
import { Stock } from '../../../shared/models/Stock';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent {
  stock: Stock = new Stock();
  constructor(private stockService: StockService, activatedRoute:ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if(params.ticker)
      this.stock = this.stockService.getInfoByTicker(params.ticker);
      else
      this.stock = stockService.getSample();
    })
  }
}
