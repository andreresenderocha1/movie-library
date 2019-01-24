import { NgModule, Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import { ProfileComponent } from './user/profile/profile.component';
import { AddMovieComponent } from './movies/add-movie/add-movie.component';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/all-movies', pathMatch: 'full'},
  {path: 'all-movies', component: ListMoviesComponent},
  {path: 'movie-detail/:id', component: MovieDetailComponent},
   
  
  {path: 'user/profile',component: ProfileComponent},
  {path: 'add-movie', component: AddMovieComponent}
];

@NgModule({  
    imports: [RouterModule.forRoot(routes)],  
    exports : [RouterModule]  
})
export class AppRoutingModule {
  
 }
