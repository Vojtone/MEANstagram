import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class AuthService implements OnInit {
  public loggedUsernameChanged = new Subject<string>();

  private loggedUsername = '';

  constructor() {}

  ngOnInit() {
  }

  public setLoggedUsername(username: string) {
    localStorage.setItem('loggedUsername', username);
    this.loggedUsername = username;
    this.loggedUsernameChanged.next(this.loggedUsername);
  }

  public getLoggedUsername() {
    return localStorage.getItem('loggedUsername');
  }
}
