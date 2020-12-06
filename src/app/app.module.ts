import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import {ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './token-interceptor';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CreatetopicComponent } from './topic/create-topic/create-topic.component';
import { ListtopicsComponent } from './topic/list-topics/list-topics.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SubSidebarComponent } from './shared/sub-sidebar/sub-sidebar.component';
import { PostViewComponent } from './shared/post-view/post-view.component';
import { VoteViewComponent } from './shared/vote-view/vote-view.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { CommentsComponent } from './comments/comments.component';
import { ViewtopicComponent } from './topic/view-topic/view-topic.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ProfileComponent } from './profile/profile.component';
import { PostSummaryComponent } from './post/post-summary/post-summary.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    SubSidebarComponent,
    CreatePostComponent,
    CreatetopicComponent,
    ListtopicsComponent,
    PostViewComponent,
    VoteViewComponent,
    ViewPostComponent,
    CommentsComponent,
    ViewtopicComponent,
    ProfileComponent,
    PostSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule

  ],
  providers: [

  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi:true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
