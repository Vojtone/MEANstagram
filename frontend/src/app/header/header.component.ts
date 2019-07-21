import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../shared/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  loggedUsernameSub: Subscription;
  loggedUsername = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loggedUsernameSub = this.authService.loggedUsernameChanged
      .subscribe(
        (username: string) => {
          this.loggedUsername = username;
        }
      );
    this.loggedUsername = this.authService.getLoggedUsername();
  }

  logout() {
    console.log('logout');
  }
}
