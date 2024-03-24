import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap, catchError, debounceTime } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AUTOCOMPLETE_URL } from '../../../shared/constants/urls';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit{

  tickerFormCtrl = new FormControl('');
  dummyCtrl = new FormControl('');
  companies: Observable<any[]> = of([]);
  autoCom: any[] = [];


  constructor(private activatedRoute:ActivatedRoute, private router:Router, private http:HttpClient){
    this.activatedRoute.params.subscribe((params) => {
      if(params.ticker) {
        this.tickerFormCtrl.setValue(params.ticker);
      }
    });
  }

  ngOnInit(): void {
    this.tickerFormCtrl.valueChanges.pipe(
      debounceTime(300),
    ).subscribe((value) => {
      this.dummyCtrl.setValue("");
      this.autoCom = [];
      if (!value || value.length == 0) {
        this.autoCom = [];
        this.dummyCtrl.setValue("");
      } else {
        this.http.get<any[]>(AUTOCOMPLETE_URL + value.trim()).subscribe((data) => {
          this.autoCom = data;
          this.dummyCtrl.setValue(value);
        });
      }
    });

    this.companies = this.dummyCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.autoCom.slice())
    );
  }

  OnSearchClick():void{
    this.router.navigateByUrl('/search/'+this.tickerFormCtrl.value);
  }

  OnCancelClick() {
    this.tickerFormCtrl.setValue('');
    this.router.navigateByUrl('/');
  }

  onOptionClick(ticker: string) {
    this.tickerFormCtrl.setValue(ticker);
    this.router.navigateByUrl('/search/' + ticker);
  }
}
