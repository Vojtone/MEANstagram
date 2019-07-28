import {Post} from './post.model';
import {Comment} from './comment.model';
import {User} from './user.model';
import {UsersService} from './users.service';
import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';

@Injectable()
export class PostsService implements OnInit {
  public postsChanged = new Subject<Post[]>();

  users: User[] = [];
  usersSubscription: Subscription;

  private posts: Post[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersSubscription = this.usersService.usersChanged
      .subscribe(
        (users: User[]) => {
          this.users = users;
        }
      );
    this.users = this.usersService.getAllUsers();
  }

  public setPosts(posts: Post[]) {
    this.posts = posts;
    this.postsChanged.next(this.posts.slice());
  }

  public addPost(post: Post) {
    this.posts.push(post);
    this.postsChanged.next(this.posts.slice());
  }

  public getAllPosts() {
    return this.posts.slice();
  }

  public getPost(id) {
    return this.posts[id];
  }

  public getUserPosts(username) {
    return this.posts.filter(post => post.user === username);
  }

  // ngOnDestroy() {
  //   this.usersSubscription.unsubscribe();
  // }
}
