import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostWallComponent} from './post-wall/post-wall.component';
import {UserProfileComponent} from './user-profile/user-profile.component';

const appRoutes: Routes = [
  {path: '', component: PostWallComponent},
  {path: 'jan', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
