import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
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

  checkIfFbUserIdInDb(fbUserId) {
    const req = new HttpRequest('POST', 'http://localhost:8080/users/fbCheck', fbUserId);
    return this.httpClient.request(req);
  }

  addNewUser(newUser) {
    const req = new HttpRequest('POST', 'http://localhost:8080/users', newUser);
    return this.httpClient.request(req);
  }

  addNewPost(newPost) {
    const req = new HttpRequest('POST', 'http://localhost:8080/posts', newPost, {reportProgress: true});
    return this.httpClient.request(req);
  }

  updatePost(post) {
    const url = 'http://localhost:8080/posts/' + post.id;
    console.log(url);
    const req = new HttpRequest('PUT', url, post, {reportProgress: true});
    return this.httpClient.request(req);
  }

  deletePost(post) {
    const req = new HttpRequest('DELETE', 'http://localhost:8080/posts', post, {reportProgress: true});
    return this.httpClient.request(req);
  }

  getUsers() {
    this.httpClient.get<User[]>('http://localhost:8080/users', {
      observe: 'body',
      responseType: 'json'
    })
      // .pipe(map(
      //   (users) => {
      //     return users;
      //   }
      // ))
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
      // .pipe(map(
      //   (posts) => {
      //     return posts;
      //   }
      // ))
      .subscribe(
        (posts: Post[]) => {
          this.postsService.setPosts(posts);
        }
      ); // TODO: DRY & url to var & work on model here (map)
  }
}
