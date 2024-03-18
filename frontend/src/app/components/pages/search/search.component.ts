import { Component } from '@angular/core';
import { Stock } from '../../../shared/models/Stock';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  stock: Stock;
  constructor(private stockService: StockService) {
    this.stock = stockService.getAll();
  }
}
