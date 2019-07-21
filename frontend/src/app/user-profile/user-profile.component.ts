import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {User} from '../shared/user.model';
import {Subscription} from 'rxjs';
import {PostsService} from '../shared/posts.service';
import {UsersService} from '../shared/users.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: []
})
export class UserProfileComponent implements OnInit {
  postsSubscription: Subscription;
  usersSubscription: Subscription;

  user: User;
  loggedUser = 'jan'; // TODO: remove it?
  postRows = [];
  userPosts = [];

  constructor(private postsService: PostsService,
              private usersService: UsersService,
              private route: ActivatedRoute) { }

  private makePostRows() {
    this.postRows = [];
    for (let i = 0; i < this.userPosts.length; i++) {
      if (i % 3 === 0) {
        this.postRows.push([]);
      }
      this.postRows[Math.floor(i / 3)].push(this.userPosts[i]);
    }
  }

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('user');
    this.user = this.usersService.getUser(username);
    this.userPosts = this.postsService.getUserPosts(username);
    this.makePostRows();

    this.postsSubscription = this.postsService.postsChanged
      .subscribe(
        () => {
          this.user = this.usersService.getUser(username);
          this.userPosts = this.postsService.getUserPosts(username);
          this.makePostRows();
        }
      );

    this.usersSubscription = this.usersService.usersChanged.subscribe();

    this.route.params.subscribe(routeParams => {
      const usr = routeParams.user;
      this.user = this.usersService.getUser(usr);
      this.userPosts = this.postsService.getUserPosts(usr);
      this.makePostRows();
    });
  }

}
