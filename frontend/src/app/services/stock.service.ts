import { Injectable } from '@angular/core';
import { Stock } from '../shared/models/Stock';
import { sample_stock } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor() { }

  getAll(): Stock {
    return sample_stock;
  }
}
