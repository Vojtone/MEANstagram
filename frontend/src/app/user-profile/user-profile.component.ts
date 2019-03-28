import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../shared/user.model';
import {Post} from '../shared/post.model';
import {UserProfileService} from './user-profile.service';
import {forEach} from '@angular/router/src/utils/collection';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: []
})
export class UserProfileComponent implements OnInit {
  loggedUser: User;
  postRows = [];

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.loggedUser = this.userProfileService.getLoggedUser();

    const posts = this.loggedUser.posts;
    for (let i = 0; i < posts.length; i++) {
      if (i % 3 === 0) {
        this.postRows.push([]);
      }
      this.postRows[Math.floor(i / 3)].push(posts[i]);
    }
  }

}
