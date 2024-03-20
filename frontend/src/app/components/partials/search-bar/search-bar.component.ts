import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit{
  ticker = '';
  constructor(activatedRoute:ActivatedRoute, private router:Router){
    activatedRoute.params.subscribe((params) => {
      if(params.ticker)
      this.ticker = params.ticker;
    });
  }

  ngOnInit(): void {

  }

  search(ticker:string):void{
    if(ticker)
    this.router.navigateByUrl('/search/'+ticker);
  }
}
