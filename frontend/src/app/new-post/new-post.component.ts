import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Post} from '../shared/post.model';
import {PostsService} from '../shared/posts.service';
import {UsersService} from '../shared/users.service';
import {DataStorageService} from '../shared/data-storage.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {Subscription} from 'rxjs';
import {HttpClient, HttpRequest} from '@angular/common/http';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  providers: []
})
export class NewPostComponent implements OnInit {
  // loggedUser = 'jan';
  loggedUsernameSub: Subscription;
  loggedUsername = '';
  description = '';

  constructor(private postsService: PostsService,
              private usersService: UsersService,
              private dataStorageService: DataStorageService,
              private router: Router,
              private authService: AuthService,
              private httpClient: HttpClient) {}

  ngOnInit() {
    if (this.authService.getLoggedUsername() === '') {
      this.router.navigate(['/']);
    }

    this.loggedUsernameSub = this.authService.loggedUsernameChanged
      .subscribe(
        (username: string) => {
          this.loggedUsername = username;
        }
      );
    this.loggedUsername = this.authService.getLoggedUsername();

    const url = 'https://quotes.rest/qod';
    const req = new HttpRequest('GET', url);
    this.httpClient.request(req)
      .subscribe(
        (response) => {
                if (response['body'] !== undefined) {
                  console.log(response['body'].contents.quotes[0].quote);
                  this.description = response['body'].contents.quotes[0].quote;
                }
              },
              (error) => {
              console.log('Too many requests for now');
              this.description = '';
              });
  }

  public onAddPost(form: NgForm) {
    const formVal = form.value;
    // TODO: get logged user
    const newPost = new Post('-1', this.loggedUsername, formVal.photoUrl, formVal.description, new Date(), [], []);
    this.dataStorageService.addNewPost(newPost)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.type === 1) {
            this.dataStorageService.getPosts();
            this.dataStorageService.getUsers();
            this.router.navigate(['/wall']);
          }
        }
      );
  }

}
