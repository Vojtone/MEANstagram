import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../shared/user.model';
import {Subscription} from 'rxjs';
import {PostsService} from '../shared/posts.service';
import {UsersService} from '../shared/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: []
})
export class UserProfileComponent implements OnInit {
  postsSubscription: Subscription;
  usersSubscription: Subscription;

  loggedUser: User;
  postRows = [];
  userPosts = [];

  constructor(private postsService: PostsService,
              private usersService: UsersService) { }

  private makePostRows() {
    for (let i = 0; i < this.userPosts.length; i++) {
      if (i % 3 === 0) {
        this.postRows.push([]);
      }
      this.postRows[Math.floor(i / 3)].push(this.userPosts[i]);
    }
  }

  ngOnInit() {
    this.postsSubscription = this.postsService.postsChanged
      .subscribe(
        () => {
          this.userPosts = this.postsService.getUserPosts(this.loggedUser);
          this.makePostRows();
        }
      );

    this.usersSubscription = this.usersService.usersChanged
      .subscribe(
        (users: User[]) => {
          this.loggedUser = users[0];
        }
      );

    this.loggedUser = this.usersService.getUser(0);
    this.userPosts = this.postsService.getUserPosts(this.loggedUser);
    this.makePostRows();
  }

}
