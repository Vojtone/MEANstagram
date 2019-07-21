import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataStorageService} from '../shared/data-storage.service';
import {NgForm} from '@angular/forms';
import {User} from '../shared/user.model';

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
              private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    const parentScope = this;

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
        parentScope.loading = false;
        if (response.status === 'connected') {
          // check if fb user in db
          const fbUserId = response.authResponse.userID + '';
          console.log('FB userID: ' + fbUserId);

          parentScope.dataStorageService.checkIfFbUserIdInDb({fbUserId: fbUserId})
            .subscribe((res) => {
              if (res['body'] !== undefined) {
                parentScope.fbUserID = fbUserId;
                if (res['body']) {
                  // parentScope.zone.run(() =>
                  //   parentScope.router.navigate(['/wall'])
                  // );
                  console.log(res['body'] + ' (fbID in DB)');
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
    console.log('submit login to facebook');
    // FB.login();
    FB.login((response) => {

      console.log('submitLogin', response);
      if (response.authResponse) {
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
              console.log('created');
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
