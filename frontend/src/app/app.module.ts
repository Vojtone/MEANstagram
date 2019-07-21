import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import {UsersService} from './shared/users.service';
import {PostsService} from './shared/posts.service';
import {HttpClientModule} from '@angular/common/http';
import {DataStorageService} from './shared/data-storage.service';
import { PostDetailModalComponent } from './user-profile/post-detail-modal/post-detail-modal.component';
import { HomeComponent } from './home/home.component';
import {AuthService} from './shared/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostWallComponent,
    UserProfileComponent,
    UserDataComponent,
    UserPostsGridComponent,
    PostComponent,
    NewPostComponent,
    PostDetailModalComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [UsersService, PostsService, DataStorageService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [PostDetailModalComponent]
})
export class AppModule { }
