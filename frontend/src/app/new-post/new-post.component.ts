import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Post} from '../shared/post.model';
import {PostsService} from '../shared/posts.service';
import {UsersService} from '../shared/users.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  providers: []
})
export class NewPostComponent implements OnInit {

  constructor(private postsService: PostsService,
              private usersService: UsersService) { }

  ngOnInit() {
  }

  public onAddPost(form: NgForm) {
    const formVal = form.value;
    //const newPost = new Post(this.userProfileService.getLoggedUser(), formVal.photoUrl, formVal.description, new Date(), [], []);
    // this.userProfileService.addPost(newPost);
    //this.postsService.addPost(newPost);
    //this.usersService.addPostToUser(0, newPost); // to jest niepoprawne
  }

}
