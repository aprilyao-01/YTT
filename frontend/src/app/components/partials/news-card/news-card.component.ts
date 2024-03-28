import { Component, Input, TemplateRef, inject } from '@angular/core';
import { News } from '../../../shared/models/Stock';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css'
})
export class NewsCardComponent {

  @Input() 
  news!: News;

  private modalService = inject(NgbModal);

  constructor() { }

  
  openModal(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
			},
			(reason) => {
			},
		);
	}
}
