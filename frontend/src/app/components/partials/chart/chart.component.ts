import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import HC_more from 'highcharts/highcharts-more';
import HC_exporting from 'highcharts/modules/exporting';
import HC_drag_pane from 'highcharts/modules/drag-panes'
import HC_indicators_all from 'highcharts/indicators/indicators-all';
import HC_vbp from 'highcharts/indicators/volume-by-price';
import HC_indicators from 'highcharts/indicators/indicators';
import HC_indicator_volume from 'highcharts/indicators/volume-by-price';
import { format, fromUnixTime } from 'date-fns';
HC_indicators(Highcharts);
HC_indicator_volume(Highcharts);
HC_more(Highcharts);
HC_exporting(Highcharts);
HC_drag_pane(Highcharts);
HC_indicators_all(Highcharts);
HC_vbp(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})

export class ChartComponent implements OnInit {

  @Input() chartType: string = 'summary';

  chartOptions: Highcharts.Options = { series: [ ] };
  highcharts: typeof Highcharts = Highcharts;

  constructor() {  }

  ngOnInit(): void {
    this.setChart(this.chartType);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.chartType) this.setChart(this.chartType);
  }

  setChart(chartType: string): void {
    if(chartType === 'lastworking') this.setLastworkingChart();
    if(chartType === 'recommendation') this.setRecommendationChart();
    if(chartType === 'earnings') this.setEarningsChart();
    if(chartType === 'history') this.setHistoryChart();
  }

  setLastworkingChart(){
    console.log("setLastworkingChart");
    var data = JSON.parse(localStorage.getItem('lastworking') || "[]");
    const ticker = JSON.parse(localStorage.getItem('profile') || "{}").ticker;
    const quote = JSON.parse(localStorage.getItem('quote') || "{}");

    const color = quote.dp < 0 ? 'red' : 'green';

    const formattedData = data.map((item: any) => ({
      x: item.t,
      y: item.c,
      name: format(fromUnixTime(item.t / 1000), 'HH:mm')
    }));

    this.chartOptions = {
      chart: {
        type: 'spline',
      },
      title: {
        text: `${ticker} Hourly Price Variation`
      },
      scrollbar: {
        enabled: true
      },
      yAxis: {
        title: {
          text: ''
        },
        opposite: true
      },
      xAxis: {
        type: 'datetime',
        labels: {
          enabled: true,
          format: '{value:%H:%M}',
        },
      },
      plotOptions: {
        series: {
          dataGrouping: {
            enabled: false,
          }
        }
      },
      series: [{
        showInLegend: false,
        data: formattedData,
        type: 'line',
        name: 'Price',
        marker: {
          radius: 0,
          lineWidth: 1,
        },
        color: color
      }]

    }

  }

  setHistoryChart() {
    const ticker = JSON.parse(localStorage.getItem('profile') || "{}").ticker;
    const rawData = JSON.parse(localStorage.getItem('history') || "[]");

    const groupingUnits = [[
      'week',                         // unit name
      [1]                             // allowed multiples
    ], [
      'month',
      [1, 2, 3, 4, 6]
    ]];

    // convert data to the format required by Highcharts
    const ohlcData = rawData.map((item: any) => [
      item.t, // the date
      item.o, // open
      item.h, // high
      item.l, // low
      item.c  // close
    ]);

    const volumeData = rawData.map((item: any) => [
      item.t, // the date
      item.v  // volume
    ]);

    this.chartOptions = {
      rangeSelector: {
        enabled: true,
        selected: 2,
        // inputEnabled: true,
        buttons: [{
          type: 'month',
          count: 1,
          text: '1m'
        }, {
          type: 'month',
          count: 3,
          text: '3m'
        }, {
          type: 'month',
          count: 6,
          text: '6m'
        }, {
          type: 'ytd',
          text: 'YTD'
        }, {
          type: 'year',
          count: 1,
          text: '1y'
        }, {
          type: 'all',
          text: 'All'
        }]
      },
      
      title: {
        text: `${ticker} Historical`
      },

      subtitle: {
        text: 'With SMA and Volume by Price technical indicators'
      },

      navigator: {
        enabled: true,
        series: [{
          type: 'zigzag', // Add the missing "type" property
          accessibility: {
              exposeAsGroupOnly: true
          }
        }]
      },

      yAxis: [{
        startOnTick: false,
        endOnTick: false,
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'OHLC'
        },
        opposite: true,
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true
        }
      }, {
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'Volume'
        },
        opposite: true,
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }],
  
      tooltip: {
        split: true
      },

      plotOptions: {
        series: {
          dataGrouping: {
            enabled: false,
          }
        }
      },
      series: [{
        type: 'candlestick',
        name: ticker,
        id: 'ohlc',
        zIndex: 2,
        data: ohlcData
      }, {
        type: 'column',
        name: 'Volume',
        id: 'volume',
        data: volumeData,
        yAxis: 1
      }, {
        type: 'vbp',
        linkedTo: 'ohlc',
        params: {
          volumeSeriesID: 'volume'
        },
        dataLabels: {
          enabled: false
        },
        zoneLines: {
          enabled: false
        }
      }, {
        type: 'sma',
        linkedTo: 'ohlc', // Link the SMA to the ohlc series
        zIndex: 1, // To draw the line above the columns
        marker: {
          enabled: false
        }
      }]
    }
  }


  setEarningsChart() {
    var data = JSON.parse(localStorage.getItem('earnings') || "[]");
    var xCategories = [];
    var xActual = [];
    var xEstimate = [];
    for (var i = 0; i < data.length; i++) {
      xCategories.push(data[i].period + "<br/>Surprise: " + String(data[i].surprise));
      xActual.push(data[i].actual);
      xEstimate.push(data[i].estimate);
    }
    this.chartOptions = {
      title: {
        text: "Historical EPS Surprises"
      },
      xAxis: {
        categories: xCategories
      },
      yAxis: {
        title: {
          text: 'Quantity EPS'
        },
      },
      tooltip: {
        shared: true,
      },
      plotOptions: {
        series: {
          dataGrouping: {
            enabled: false,
          }
        }
      },
      series: [
        {
          data: xActual,
          name: 'Actual',
          type: 'spline'
        },
        {
          data: xEstimate,
          name: 'Estimate',
          type: 'spline'
        }
      ]
    };
  }


  setRecommendationChart() {
    var data = JSON.parse(localStorage.getItem('recommendation') || "[]");
    var xCategories = [];
    var xStrongBuy = [];
    var xBuy = [];
    var xHold = [];
    var xSell = [];
    var xStrongSell = [];
    for (var i = 0; i < data.length; i++) {
      xCategories.push(data[i].period);
      xStrongBuy.push(data[i].strongBuy);
      xBuy.push(data[i].buy);
      xHold.push(data[i].hold);
      xSell.push(data[i].sell);
      xStrongSell.push(data[i].strongSell);
    }

    this.chartOptions = {
      title: {
        text: "Recommendation Trends"
      },
      chart: {
        type: 'column'
      },
      xAxis: {
        categories: xCategories
      },
      yAxis: {
        min: 0,
        title: {
          text: '#Analysis'
        },
        stackLabels: {
          enabled: false,
          style: {
            fontWeight: 'bold'
          }
        }
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false
          }
        }
      },
      series: [
        {
          type: 'column',
          name: 'Strong Buy',
          data: xStrongBuy,
          color: '#18632f'
        },
        {
          type: 'column',
          name: 'Buy',
          data: xBuy,
          color: '#19b049'
        },
        {
          type: 'column',
          name: 'Hold',
          data: xHold,
          color: '#af7f1b'
        },
        {
          type: 'column',
          name: 'Sell',
          data: xSell,
          color: '#f15050'
        },
        {
          type: 'column',
          name: 'Strong Sell',
          data: xStrongSell,
          color: '#742c2e'
        },
      ]
    };
  }
}