import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataStorageService} from '../shared/data-storage.service';
import {NgForm} from '@angular/forms';
import {User} from '../shared/user.model';
import {AuthService} from '../shared/auth.service';

declare var FB: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = true;
  showSignUp = false;
  fbUserID = '';
  signUpMessage = '';

  username = '';
  profilePicUrl = '';
  description = '';

  constructor(private router: Router,
              private zone: NgZone,
              private dataStorageService: DataStorageService,
              private cdRef: ChangeDetectorRef,
              private authService: AuthService) {}

  ngOnInit() {
    console.log('ngInit');
    this.authService.setLoggedUsername('');
    const parentScope = this;
    parentScope.loading = false;
    parentScope.cdRef.detectChanges();

    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '451437338977907',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });

      FB.AppEvents.logPageView();

      FB.getLoginStatus((response) => {
        console.log(response.status);
        if (response.status === 'connected') {
          FB.logout((r) => console.log(r));
          response.status = 'unknown';
        }
        parentScope.loading = false;
        parentScope.cdRef.detectChanges();
        // parentScope.loading = false;
        // parentScope.cdRef.detectChanges();
        // if (response.status === 'connected') {
        //   // check if fb user in db
        //   const fbUserId = response.authResponse.userID + '';
        //   console.log('FB userID: ' + fbUserId);
        //
        //   parentScope.dataStorageService.checkIfFbUserIdInDb({fbUserId: fbUserId})
        //     .subscribe((res) => {
        //       if (res['body'] !== undefined) {
        //         parentScope.fbUserID = fbUserId;
        //         if (res['body'].status) {
        //           // localStorage.setItem('loggedUsername', res['body'].username); // TODO: id (hash) not username
        //           parentScope.authService.setLoggedUsername(res['body'].username);
        //           console.log(res['body'].username + ' (fbID in DB)');
        //           parentScope.zone.run(() =>
        //             parentScope.router.navigate(['/wall'])
        //           );
        //         } else {
        //           // show modal signUp
        //           console.log(res['body'] + ' (fbID NOT in DB)');
        //           parentScope.showSignUp = true;
        //           console.log(parentScope.showSignUp);
        //           parentScope.cdRef.detectChanges();
        //         }
        //       }
        //     });
        // }
      });

    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  fbLogin() {
    const parentScope = this;
    console.log('submit login to facebook');
    // FB.login();

    FB.getLoginStatus((response) => {
      console.log(response.status);
      if (response.status === 'connected') {
        FB.logout((r) => {
          console.log(r);
          parentScope.login(parentScope);
        });
      } else {
        parentScope.login(parentScope);
      }

    });
  }

  login(parentScope) {
    FB.login((response) => {

      console.log('submitLogin', response);
      if (response.authResponse) {

        if (response.status === 'connected') {
          // check if fb user in db
          const fbUserId = response.authResponse.userID + '';
          console.log('FB userID: ' + fbUserId);

          parentScope.dataStorageService.checkIfFbUserIdInDb({fbUserId: fbUserId})
            .subscribe((res) => {
              if (res['body'] !== undefined) {
                parentScope.fbUserID = fbUserId;
                if (res['body'].status) {
                  // localStorage.setItem('loggedUsername', res['body'].username); // TODO: id (hash) not username
                  parentScope.authService.setLoggedUsername(res['body'].username);
                  console.log(res['body'].username + ' (fbID in DB)');
                  parentScope.zone.run(() =>
                    parentScope.router.navigate(['/wall'])
                  );
                } else {
                  // show modal signUp
                  console.log(res['body'] + ' (fbID NOT in DB)');
                  parentScope.showSignUp = true;
                  console.log(parentScope.showSignUp);
                  parentScope.cdRef.detectChanges();
                }
              }
            });
        }

        // login success
        // login success code here
        // redirect to home page
      } else {
        console.log('User login failed');
      }
    });
  }

  public onSignUp(form: NgForm) {
    this.loading = true;
    this.cdRef.detectChanges();
    const formVal = form.value;
    // TODO: get logged user
    const newUser = new User(formVal.username, formVal.profilePicUrl, formVal.description,
      [], [], []);
    this.dataStorageService.addNewUser({fbUserID: this.fbUserID, newUser: newUser})
      .subscribe(
        (response) => {
          console.log(response);
          this.dataStorageService.getUsers();

          if (response['body'] !== undefined) {
            this.loading = false;
            this.cdRef.detectChanges();
            if (response['body'].status) {
              // success
              console.log('created ' + response['body'].username);
              // localStorage.setItem('loggedUsername', response['body'].username);
              this.authService.setLoggedUsername(response['body'].username);
              this.zone.run(() =>
                this.router.navigate(['/wall'])
              );
              // TODO: redirect here
            } else {
              // show message
              console.log(response['body'].msg);
              this.signUpMessage = response['body'].msg;
              this.cdRef.detectChanges();
            }
          }
          // this.router.navigate(['/wall']); // TODO: tu leca errory
        }
      );
    // console.log(a);
    // this.userProfileService.addPost(newPost);
    // this.postsService.addPost(newPost);
    // this.usersService.addPostToUser(0, newPost); // to jest niepoprawne
  }

}
