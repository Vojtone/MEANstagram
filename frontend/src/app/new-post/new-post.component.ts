import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Post} from '../shared/post.model';
import {PostsService} from '../shared/posts.service';
import {UsersService} from '../shared/users.service';
import {DataStorageService} from '../shared/data-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  providers: []
})
export class NewPostComponent implements OnInit {
  loggedUser = 'jan';

  constructor(private postsService: PostsService,
              private usersService: UsersService,
              private dataStorageService: DataStorageService,
              private router: Router) { }

  ngOnInit() {
  }

  public onAddPost(form: NgForm) {
    const formVal = form.value;
    // TODO: get logged user
    const newPost = new Post('-1', this.loggedUser, formVal.photoUrl, formVal.description, new Date(), [], []);
    this.dataStorageService.addNewPost(newPost)
      .subscribe(
        (response) => {
          console.log(response);
          this.dataStorageService.getPosts();
          this.dataStorageService.getUsers();
          this.router.navigate(['/']); // TODO: tu leca errory
        }
      );
    // console.log(a);
    // this.userProfileService.addPost(newPost);
    // this.postsService.addPost(newPost);
    // this.usersService.addPostToUser(0, newPost); // to jest niepoprawne
  }

}
