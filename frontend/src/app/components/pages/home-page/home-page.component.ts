import { Component } from '@angular/core';
import { sample_news } from '../../../../data';
import { News } from '../../../shared/models/Stock';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
news: News = sample_news;

}
