import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostWallComponent } from './post-wall/post-wall.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDataComponent } from './user-profile/user-data/user-data.component';
import { UserPostsGridComponent } from './user-profile/user-posts-grid/user-posts-grid.component';
import { PostComponent } from './post-wall/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostWallComponent,
    UserProfileComponent,
    UserDataComponent,
    UserPostsGridComponent,
    PostComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
