import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-detail-modal',
  templateUrl: './post-detail-modal.component.html',
  styleUrls: ['./post-detail-modal.component.css']
})
export class PostDetailModalComponent implements OnInit {
  @Input() post;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
