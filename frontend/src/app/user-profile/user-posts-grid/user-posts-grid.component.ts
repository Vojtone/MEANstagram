import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../shared/post.model';

@Component({
  selector: 'app-user-posts-grid',
  templateUrl: './user-posts-grid.component.html',
  styleUrls: ['./user-posts-grid.component.css']
})
export class UserPostsGridComponent implements OnInit {
  @Input() postRow: Post[];

  constructor() { }

  ngOnInit() {
  }

}
