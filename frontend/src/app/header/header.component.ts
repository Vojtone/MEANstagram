import {Component, OnChanges, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUsernameSub: Subscription;
  loggedUsername = '';
  currentRoute = '';

  constructor(private authService: AuthService,
              private router: Router) {
    router.events.subscribe((val) => {
      if (val['url'] !== undefined) {
        this.currentRoute = val['url'];
      }
    });
  }

  ngOnInit() {
    this.loggedUsernameSub = this.authService.loggedUsernameChanged
      .subscribe(
        (username: string) => {
          this.loggedUsername = username;
        }
      );
    this.loggedUsername = this.authService.getLoggedUsername();
  }
}
