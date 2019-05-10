import {User} from './user.model';
import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UsersService {
  usersChanged = new Subject<User[]>();

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

  public getUser(id) {
    return this.users.filter((user) => user.username === id)[0] || this.users[id];
    // TODO: Przejsc na samo id albo username
    // return this.users[id];
  }
}
