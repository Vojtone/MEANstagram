import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/post.model';
import {Subscription} from 'rxjs';
import {PostsService} from '../shared/posts.service';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-wall',
  templateUrl: './post-wall.component.html',
  styleUrls: ['./post-wall.component.css']
})
export class PostWallComponent implements OnInit {
  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postsService: PostsService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    if (this.authService.getLoggedUsername() === '') {
      this.router.navigate(['/']);
    }

    this.postsSubscription = this.postsService.postsChanged
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        }
      );
    this.posts = this.postsService.getAllPosts();
  }
}
