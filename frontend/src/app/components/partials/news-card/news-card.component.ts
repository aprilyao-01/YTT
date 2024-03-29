import { Component, Input, TemplateRef, inject } from '@angular/core';
import { News } from '../../../shared/models/Stock';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css'
})
export class NewsCardComponent {

  @Input() 
  news!: News;

  private modalService = inject(NgbModal);

  constructor(private sanitizer:DomSanitizer) { }
  
  getTwitterShareUrl(news: any): any {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(news.headline)}&url=${encodeURIComponent(news.url)}`;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  getFacebookShareUrl(news: any): any {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(news.url)}`;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  
  openModal(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
			},
			(reason) => {
			},
		);
	}
}
