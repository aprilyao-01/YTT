import { Component } from '@angular/core';
import { Stock } from '../../../shared/models/Stock';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
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
