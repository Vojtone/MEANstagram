import {Post} from '../shared/post.model';
import {User} from '../shared/user.model';
import {Comment} from '../shared/comment.model';
import {PostsService} from '../shared/posts.service';
import {Injectable} from '@angular/core';

@Injectable()
export class PostWallService {
  constructor(public postsService: PostsService) {}

  private posts: Post[] = this.postsService.getAllPosts();

  getPosts() {
    return this.posts.slice();
  }
}
