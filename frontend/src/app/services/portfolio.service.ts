import { Injectable } from '@angular/core';
import { Portfolio } from '../shared/models/Portfolio';
import { sample_portfolio } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor() { }

  getAll(): Portfolio {
    return sample_portfolio;
  }
}
