import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Post} from '../shared/post.model';
import {UserProfileService} from '../user-profile/user-profile.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  providers: []
})
export class NewPostComponent implements OnInit {

  constructor(private upService: UserProfileService) { }

  ngOnInit() {
  }

  public onAddPost(form: NgForm) {
    const formVal = form.value;
    const newPost = new Post(formVal.photoUrl, formVal.description, new Date(), 0, []);
    this.upService.addPost(newPost);
  }

}
