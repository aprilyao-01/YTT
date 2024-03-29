import { Component, Input, TemplateRef, inject } from '@angular/core';
import { PortfolioService } from '../../../services/portfolio.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buy-sell',
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.css']
})
export class BuySellComponent {
  
  @Input() name: string = 'text';
  @Input() ticker: string = "TST";
  @Input() price: number = 3.22;

  mode: string = "";
  balance: number;
  holding: number = 0;
  quantity: number = 0;
  total: number = 0;
  totalStr: string = '0';

  isFrac: boolean = false;
  canNotBuy: boolean = false;
  canNotSell: boolean = false;
  disabled: boolean = true;

  // private modalService = inject(NgbModal);

  constructor(private portfolioService: PortfolioService, private modalService: NgbModal) {
    this.balance = this.portfolioService.getBalance();
  }

  ngOnInit(): void {
    this.holding = this.portfolioService.getHoldingQuantity(this.ticker);
  }

  doTransaction() {
    if (this.mode == 'Buy') {
      this.portfolioService.buyStock(this.ticker, this.price, this.name, this.quantity, this.total);
    } else {
      this.holding -= this.quantity;
      this.portfolioService.sellStock(this.ticker, this.quantity, this.total);
    }

    // Close the modal after the transaction
    this.modalService.dismissAll();
  }

  onValueChange() {
    if (this.quantity == null) {
      this.totalStr = "";
    } else {
      this.total = this.price * this.quantity;
      this.total = Math.round(this.total * 100) / 100;
      this.totalStr = this.total.toFixed(2);
    }
    this.disabled = false;
    if (this.quantity != null && !Number.isInteger(this.quantity)) {
      this.isFrac = true;
      this.disabled = true;
    } else {
      this.isFrac = false;
    }
    if (this.mode === 'Buy') {
      if (this.balance < this.total) {
        this.canNotBuy = true;
        this.disabled = true;
      } else {
        this.canNotBuy = false;
      }
    } else if(this.mode === 'Sell') {
      if (this.holding < this.quantity) {
        this.canNotSell = true;
        this.disabled = true;
      } else {
        this.canNotSell = false;
      }
    }
    if (this.quantity == 0 || this.quantity == null) {
      this.disabled = true;
    }
  }

  openModal(content: TemplateRef<any>, mode: 'Buy' | 'Sell') {
    this.mode = mode;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
      },
      (reason) => {
      },
    );
  }
}
