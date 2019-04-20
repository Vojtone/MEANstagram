import {User} from './user.model';
import {Post} from './post.model';
import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UsersService {
  usersChanged = new Subject<User[]>();

  private users: User[];

  public setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  public getAllUsers() {
    return this.users.slice();
  }

  public addUser(user: User) {
    this.users.push(user);
  }

  public addPostToUser(userIndex: number, post: Post) {
    this.users[userIndex].posts.push(post);
  }

  public addFollowingToUser(userIndex: number, followingUserIndex: number) {
    this.users[userIndex].following.push(this.users[followingUserIndex]);
    this.users[followingUserIndex].followers.push(this.users[userIndex]);
  }

  public addFollowerToUser(userIndex: number, followerUserIndex: number) {
    this.users[userIndex].followers.push(this.users[followerUserIndex]);
    this.users[followerUserIndex].following.push(this.users[userIndex]);
  }
}
