import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostWallComponent} from './post-wall/post-wall.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {NewPostComponent} from './new-post/new-post.component';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'wall', component: PostWallComponent},
  // {path: 'jan', component: UserProfileComponent},
  {path: 'add', component: NewPostComponent},
  {path: ':user', component: UserProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
