import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/post.model';
import {PostWallService} from './post-wall.service';

@Component({
  selector: 'app-post-wall',
  templateUrl: './post-wall.component.html',
  styleUrls: ['./post-wall.component.css'],
  providers: [PostWallService]
})
export class PostWallComponent implements OnInit {
  posts: Post[];

  constructor(private postWallService: PostWallService) { }

  ngOnInit() {
    this.posts = this.postWallService.getPosts();
  }

}
