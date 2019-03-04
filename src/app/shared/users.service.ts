import {User} from './user.model';
import {Post} from './post.model';
import {Injectable} from '@angular/core';

@Injectable()
export class UsersService {
  private users: User[] = [
    new User('jan',
      'https://upload.wikimedia.org/wikipedia/commons/0/05/Orthosiphon_pallidus_%28Jyoti%29_in_Talakona_forest%2C_AP_W_IMG_8284.jpg',
      'Random user description.', [], [], []),
    new User('kuba', '', 'just kuba', [], [], []),
    new User('caty', '', 'just caty', [], [], []),
    new User('que', '', 'quequeuqeuqe', [], [], []),
    new User('fifi', '', 'fiflak', [], [], []),
  ];

  public getAllUsers() {
    return this.users;
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
