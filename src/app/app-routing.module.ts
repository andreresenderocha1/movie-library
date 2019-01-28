import { NgModule, Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { ProfileComponent } from './user/profile/profile.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';

const routes: Routes = [
  {path: '', redirectTo: '/all-movies', pathMatch: 'full'},
  {path: 'all-movies', component: ListMoviesComponent},
  {path: 'movie-detail/:id', component: MovieDetailComponent},
  {path: 'signin',component: SigninComponent},
  {path: 'signup',component: SignupComponent}, 
  {path: 'user/profile',component: ProfileComponent},
  {path: 'add-movie', component: AddMovieComponent},
  {path: 'edit-profile',component: EditProfileComponent}
];

@NgModule({  
    imports: [RouterModule.forRoot(routes)],  
    exports : [RouterModule]  
})
export class AppRoutingModule {
  
 }
