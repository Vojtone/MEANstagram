import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user.model';
import {Post} from '../shared/post.model';
import {UserProfileService} from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UserProfileService]
})
export class UserProfileComponent implements OnInit {
  user: User;

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.user = this.userProfileService.getUser();
  }

}
