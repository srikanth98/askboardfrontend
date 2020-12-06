import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CreatetopicComponent } from './topic/create-topic/create-topic.component';
import { ListtopicsComponent } from './topic/list-topics/list-topics.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import {AuthguardGuard} from './auth/authguard.guard';
import { ViewtopicComponent } from './topic/view-topic/view-topic.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
      path:'',component:HomeComponent
    },
    {
      path:'signup',component : SignupComponent
    },
    {
      path:'login',component:LoginComponent
    },
    {
      path:'create-post',component:CreatePostComponent , canActivate:[AuthguardGuard]
    },
    {
      path:'create-topic',component:CreatetopicComponent, canActivate:[AuthguardGuard]
    },
    {
        path:'view-post/:id',component:ViewPostComponent
    },
    {
      path:'view-topic/:topicID',component:ViewtopicComponent
    },
    {
        path:'view-profile/:userID',component:ProfileComponent
    },
{
  path:'list-topics',component:ListtopicsComponent
}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
