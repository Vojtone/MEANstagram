import {User} from './user.model';
import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UsersService {
  public usersChanged = new Subject<User[]>();

  private users: User[] = [];

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

  public getUser(username) {
    return this.users.filter(user => user.username === username)[0];
  }
}
