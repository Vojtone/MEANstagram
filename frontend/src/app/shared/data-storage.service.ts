import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { UsersService } from './users.service';
import { User } from './user.model';
import { PostsService } from './posts.service';
import { Post } from './post.model';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private usersService: UsersService,
              private postsService: PostsService) {
  }

  getUsers() {
    this.httpClient.get<User[]>('http://localhost:8080/users', {
      observe: 'body',
      responseType: 'json'
    })
      .pipe(map(
        (users) => {
          console.log(users);
          return users;
        }
      ))
      .subscribe(
        (users: User[]) => {
          this.usersService.setUsers(users);
        }
      );
  }

  getPosts() {
    this.httpClient.get<Post[]>('http://localhost:8080/posts', {
      observe: 'body',
      responseType: 'json'
    })
      .pipe(map(
        (posts) => {
          console.log(posts);
          return posts;
        }
      ))
      .subscribe(
        (posts: Post[]) => {
          this.postsService.setPosts(posts);
        }
      ); // TODO: DRY
  }
}
