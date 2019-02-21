import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http'
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import {AngularFireModule} from '@angular/fire';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
// import {SingleMediaPlayer} from './single-media-player';

// teste

/estou no branch

/novo testeeee

import { AppComponent } from './app.component';
import { HeaderMenuComponent } from './menu/header-menu/header-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './user/profile/profile.component';
import { LeftMenuComponent } from './menu/left-menu/left-menu.component';
import { MovieItemComponent } from './movies/movie-item/movie-item.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { DataStorageService } from './shared/data-storage.service';
import { StoreModule } from '@ngrx/store';
import { movieReducer } from './movies/movie.reducers';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import {environment} from '../environments/environment'
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage'
import {AngularFireAuthModule} from '@angular/fire/auth'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { TraillerPageComponent } from './movies/trailler-page/trailler-page.component';
import { SignupComponent } from './user/signup/signup.component';
import { SigninComponent } from './user/signin/signin.component';
import { ProfilePopupComponent } from './user/profile-popup/profile-popup.component';
import { ChangeInfosService } from './shared/change-infos.service';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { CreateAccountComponent } from './user/create-account/create-account.component';
import { MyLibraryComponent } from './user/library/my-library/my-library.component';
import { MyLibraryItemComponent } from './user/library/my-library-item/my-library-item.component';
import {DragulaModule} from 'ng2-dragula'

@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,       
    ProfileComponent,
    LeftMenuComponent,
    MovieItemComponent,
    ListMoviesComponent,
    AddMovieComponent,
    MovieDetailComponent,
    TraillerPageComponent,
    SignupComponent,
    SigninComponent,
    ProfilePopupComponent,
    EditProfileComponent,
    CreateAccountComponent,
    MyLibraryComponent,
    MyLibraryItemComponent
  ],
  imports: [
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        
    BrowserModule,    
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppRoutingModule,
    SnotifyModule,
    FontAwesomeModule,   
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    StoreModule.forRoot({movieState: movieReducer}),
    DragulaModule.forRoot()
  ],
  providers: [
    DataStorageService,
    SnotifyService,  
    ChangeInfosService,
    { provide: FirestoreSettingsToken, useValue: {} },
    {provide: 'SnotifyToastConfig',useValue: ToastDefaults}],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
