import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http'
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

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
import { ReactiveFormsModule } from '@angular/forms';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,       
    ProfileComponent,
    LeftMenuComponent,
    MovieItemComponent,
    ListMoviesComponent,
    AddMovieComponent,
    MovieDetailComponent
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppRoutingModule,
    SnotifyModule,
    FontAwesomeModule,   
    StoreModule.forRoot({movie: movieReducer})
  ],
  providers: [
    DataStorageService,
    SnotifyService,
    {provide: 'SnotifyToastConfig',useValue: ToastDefaults}],
  bootstrap: [AppComponent]
})
export class AppModule { }
