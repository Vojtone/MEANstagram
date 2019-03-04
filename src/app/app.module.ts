import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostWallComponent } from './post-wall/post-wall.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDataComponent } from './user-profile/user-data/user-data.component';
import { UserPostsGridComponent } from './user-profile/user-posts-grid/user-posts-grid.component';
import { PostComponent } from './post-wall/post/post.component';
import {AppRoutingModule} from './app-routing.module';
import { NewPostComponent } from './new-post/new-post.component';
import {FormsModule} from '@angular/forms';
import {UserProfileService} from './user-profile/user-profile.service';
import {UsersService} from './shared/users.service';
import {PostsService} from './shared/posts.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostWallComponent,
    UserProfileComponent,
    UserDataComponent,
    UserPostsGridComponent,
    PostComponent,
    NewPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [UserProfileService, UsersService, PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
