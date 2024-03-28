import { Component, Input } from '@angular/core';
import { News } from '../../../shared/models/Stock';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css'
})
export class NewsCardComponent {

  @Input() 
  news: News = {
    datetime: '',
    headline: '',
    image: '',
    related: '',
    source: '',
    summary: '',
    url: ''
  };

  constructor() { }

  OnNewsClick() {
    
  }
}
