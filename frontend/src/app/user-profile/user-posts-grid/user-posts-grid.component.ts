import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../shared/post.model';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PostDetailModalComponent} from '../post-detail-modal/post-detail-modal.component';

@Component({
  selector: 'app-user-posts-grid',
  templateUrl: './user-posts-grid.component.html',
  styleUrls: ['./user-posts-grid.component.css']
})
export class UserPostsGridComponent {
  @Input() postRow: Post[];

  constructor(private modalService: NgbModal) { }

  showDetail(post) {
    const modalRef = this.modalService.open(PostDetailModalComponent);
    modalRef.componentInstance.post = post;
  }

}
