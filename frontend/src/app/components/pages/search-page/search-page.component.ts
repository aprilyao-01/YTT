import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { sample_stock, sample_stockV2 } from '../../../../data';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WatchlistService } from '../../../services/watchlist.service';
import { Observable } from 'rxjs';
import { Stock, StockV2 } from '../../../shared/models/Stock';
import { time } from 'highcharts';
import { PortfolioService } from '../../../services/portfolio.service';
import Highcharts from 'highcharts';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit {
  
  // from service
  loading$ = this.stockService.loading$;
  stockData$ = this.stockService.stockData$;
  error$ = this.stockService.error$;

  //for setting alert
  alertVisible: boolean = false;
  alertCondition: string = 'undefined';
  alertTicker: string = '';

  // for Highcharts
  highcharts: typeof Highcharts = Highcharts;
  summaryChartOptions: Highcharts.Options = {
    series: [
      {
        data: [],
        type: 'line'
      }
    ]
  };
  recommendationChartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },
    series: [
      {
        type: 'column',
        name: 'Strong Buy',
        data: [],
        color: '#18632f'
      },
      {
        type: 'column',
        name: 'Buy',
        data: [],
        color: '#19b049'
      },
      {
        type: 'column',
        name: 'Hold',
        data: [],
        color: '#af7f1b'
      },
      {
        type: 'column',
        name: 'Sell',
        data: [],
        color: '#f15050'
      },
      {
        type: 'column',
        name: 'Strong Sell',
        data: [],
        color: '#742c2e'
      },
    ]
  }
  earningsChartOptions: Highcharts.Options = {
    title: {
      text: "Historical EPS Surprises"
    },
    tooltip: {
      shared: true,
    },
    series: [
      {
        data: [],
        type: 'spline'
      },
      {
        data: [],
        type: 'spline'
      }
    ]
  };

  
  // other page variables
  stockV2: StockV2 | null = null;
  currentTicker: string = 'home';
  

  constructor(private stockService: StockService, private activatedRoute: ActivatedRoute,
    private watchlistService: WatchlistService, private router: Router, private portfolioService: PortfolioService) {  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params.ticker && params.ticker !== 'home') {
        this.search(params.ticker);
      } else {
        this.currentTicker = 'home';
      }
    });

    // handling data, and error states
    this.stockService.stockData$.subscribe(data => {
      this.stockV2 = data;
      if(data) {
        // this.isInWatchlist = this.watchlistService.isWatched(data.profile.ticker);
        // this.updateMarketStatus();
      }
    });

    this.stockService.error$.subscribe(error => {
      if(error) {
        this.changeAlert("notFound");
      }
    });
  }

  changeAlert(condition:string, ticker?: string): void {
    this.alertCondition = condition;
    this.alertVisible = true;
    ticker? this.alertTicker = ticker : this.alertTicker = '';
  }

  toggleToWatchlist(): void{
    if(!this.stockV2) return;
    const isInWatchlist = this.watchlistService.isWatched(this.stockV2.profile.ticker);
    isInWatchlist? this.watchlistService.removeFromWatchlist(this.stockV2.profile.ticker) : this.watchlistService.addToWatchlist(this.stockV2);
    this.changeAlert(isInWatchlist? 'removeWatchlist' : 'addWatchlist', this.stockV2.profile.ticker);
    // isInWatchlist = !isInWatchlist;
  }

  search(ticker: string): void {
    // reset any previous error state before starting a new search
    this.stockService.setErrorSubject(null);
  
    if (ticker === 'home') {
      // reset the UI, clear the current stock data display
      this.currentTicker = 'home';
      this.stockService.setStockDataSubject(null);
      return;
    }
    // this.router.navigateByUrl('/search/' + ticker);
    // Set the current ticker and proceed with the search for valid tickers other than 'home'
    this.currentTicker = ticker;
    this.stockService.loadStockData(ticker);
  }
  

  OnNotify(ticker: string): void {
    console.log('Notify: ', ticker);

    if (!ticker) {
      this.changeAlert("noInput");
      this.router.navigateByUrl('/search/home');
    } else {
      this.router.navigateByUrl('/search/' + ticker);
    }
  }

  // presentSummaryChart() {
  //   var data = JSON.parse(window.localStorage.getItem('summaryChart') || "{}");
  //   var color = 'green';
  //   if (Number(this.dp) < 0) {
  //     color = 'red';
  //   }
  //   if (data.s != null && data.s == 'ok') {
  //     for (var i = 0; i < data.t.length; i++) {
  //       // TODO: fix timezone issue
  //       data.t[i] = data.t[i] * 1000;
  //     }
  //   }
  //   this.summaryChartOptions = {
  //     title: {
  //       text: `${this.stockV2?.profile.ticker} Hourly Price Variation`
  //     },
  //     xAxis: {
  //       type: 'datetime',
  //       labels: {
  //         enabled: true,
  //         format: '{value:%H:%M}',
  //       },
  //       categories: data.t,
  //       tickInterval: 10
  //     },
  //     yAxis: {
  //       title: {
  //         text: ''
  //       },
  //       opposite: true
  //     },
  //     series: [{
  //       showInLegend: false,
  //       data: data.c,
  //       type: 'line',
  //       name: 'Price',
  //       marker: {
  //         radius: 0,
  //         lineWidth: 1,
  //       },
  //       color: color
  //     }]
  //   };
  // }

  // presentHistoryChart() {
  //   var ohlc = [];
  //   var volume = [];
  //   var data = JSON.parse(window.localStorage.getItem('historyChart') || "{}");
  //   for (var i = 0; i < data.t.length; i++) {
  //     ohlc.push([data.t[i]*1000, data.o[i], data.h[i], data.l[i], data.c[i]]);
  //     volume.push([data.t[i]*1000, data.v[i]]);
  //   }
  //   this.context.ticker = this.ticker;
  //   this.context.ohlc = ohlc;
  //   this.context.volume = volume;
  //   setTimeout(() => { this.historyChartReadyFlag = true; });
  // }

  updateCurrentPrice(){
    // TODO: update when market is open
  }

  OnSellClick(ticker: string): void {
    console.log('Sell: ', ticker);
    //TODO: add pop out for quantity

    // this.portfolioService.changeQuantity(-1, ticker);
  }

  OnBuyClick(ticker: string): void {
    console.log('Buy: ', ticker);
    //TODO: add pop out for quantity
    // this.portfolioService.changeQuantity(1, ticker);
  }

  // updateMarketStatus(): void {
  //   console.log('Updating market status: ', this.stockV2);
  //   console.log('Market status element: ', this.marketStatus);
  //   if(this.stockV2 && this.marketStatus) {
  //     const marketStatusElement = this.marketStatus.nativeElement;
  //     const isMarketOpen = this.stockV2.currentPrice.markOpen;
  //     marketStatusElement.innerHTML = isMarketOpen ? 'Market is Open' : 'Market Closed on ' + this.stockV2.currentPrice.lastTimestamp;  
  //     marketStatusElement.classList.toggle('text-success', isMarketOpen);
  //     marketStatusElement.classList.toggle('text-danger', !isMarketOpen);
  //   }
  // }

  
}
