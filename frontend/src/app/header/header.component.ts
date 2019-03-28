import { Component, OnInit } from '@angular/core';
import {PostsService} from '../shared/posts.service';
import {UsersService} from '../shared/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public postsService: PostsService, public usersService: UsersService) { }

  ngOnInit() {
  }

  public initData() { // temporary solution, DB will solve it
    this.usersService.addPostToUser(0, this.postsService.getAllPosts()[0]);
    this.usersService.addPostToUser(0, this.postsService.getAllPosts()[1]);
    this.usersService.addPostToUser(0, this.postsService.getAllPosts()[2]);
    this.usersService.addPostToUser(0, this.postsService.getAllPosts()[3]);
    this.usersService.addPostToUser(1, this.postsService.getAllPosts()[4]);
    this.usersService.addPostToUser(1, this.postsService.getAllPosts()[5]);

    this.usersService.addFollowerToUser(0, 1);
    this.usersService.addFollowerToUser(0, 2);
    this.usersService.addFollowerToUser(0, 3);
    this.usersService.addFollowerToUser(0, 4);

    this.usersService.addFollowingToUser(0, 1);
    this.usersService.addFollowingToUser(0, 3);


  }

}
