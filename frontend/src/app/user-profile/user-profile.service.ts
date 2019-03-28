import {Post} from '../shared/post.model';
import {User} from '../shared/user.model';
import {Injectable} from '@angular/core';
import {UsersService} from '../shared/users.service';

@Injectable()
export class UserProfileService {
  constructor(private usersService: UsersService) {}

  private loggedUser: User = this.usersService.getAllUsers()[0];

  public getLoggedUser() {
    return this.loggedUser;
  }

  public addPost(post: Post) {
    this.loggedUser.posts.push(post);
  }
}
