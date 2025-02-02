import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AUTOCOMPLETE_URL } from '../../../shared/constants/urls';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{

  // passing data to search page
  @Output() notify = new EventEmitter();

  // handle autocomplete
  tickerFormCtrl = new FormControl('');
  dummyCtrl = new FormControl('');
  companies: Observable<any[]> = of([]);
  autoCom: any[] = [];
  loading = false;


  constructor(private activatedRoute:ActivatedRoute, private router:Router, private http:HttpClient, private stockService: StockService) {
    this.activatedRoute.params.subscribe((params) => {
      if(params.ticker && params.ticker!='home') {
        // console.log('params.ticker:', params.ticker);
        this.tickerFormCtrl.setValue(params.ticker);
        this.notify.emit(params.ticker);
      }
    });
  }

  ngOnInit(): void {
    // for autocomplete
    this.tickerFormCtrl.valueChanges.pipe(
      debounceTime(300),
    ).subscribe((value) => {
      if (!value || value.length == 0) {
        this.loading = false;
        this.autoCom = [];
        this.dummyCtrl.setValue("");
      } else {
        this.loading = true;
        this.http.get<any[]>(AUTOCOMPLETE_URL + value.trim()).subscribe((data) => {
          this.autoCom = data;
          this.dummyCtrl.setValue(value);
          this.loading = false;
        });
      }
    });

    this.companies = this.dummyCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.autoCom.slice())
    );
  }

  OnSearchClick():void{
    this.notify.emit(this.tickerFormCtrl.value);
  }

  OnCancelClick() {
    this.tickerFormCtrl.setValue('');
    this.notify.emit('home');
    this.router.navigateByUrl('/search/home');
    this.stockService.clearStockLocal();
    this.stockService.setStockDataSubject(null);
  }

  OnOptionClick(ticker: string) {
    if(ticker){
      this.tickerFormCtrl.setValue(ticker);
      this.notify.emit(ticker);
    }
    return ticker;
  }
}
