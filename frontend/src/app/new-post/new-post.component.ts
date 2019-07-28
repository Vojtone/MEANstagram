import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Post} from '../shared/post.model';
import {PostsService} from '../shared/posts.service';
import {UsersService} from '../shared/users.service';
import {DataStorageService} from '../shared/data-storage.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {Subscription} from 'rxjs';

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

  constructor(private postsService: PostsService,
              private usersService: UsersService,
              private dataStorageService: DataStorageService,
              private router: Router,
              private authService: AuthService) {}

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
