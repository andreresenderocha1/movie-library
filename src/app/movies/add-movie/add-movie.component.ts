import * as MovieActions from '../movie.actions'

import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { Movie } from '../movie.model';
import { Store } from '@ngrx/store';
import { SnotifyService } from 'ng-snotify';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  addMovieForm: FormGroup;

  constructor(private store: Store<{movie: {movies: Movie[]}}>,
              private snotifyService:SnotifyService) { }

  ngOnInit() {
    this.addMovieForm = new FormGroup({
      'url': new FormControl(),
      'description': new FormControl(null),
      'name': new FormControl(null)
    });
  }

  
  onSubmit(){
    const name = this.addMovieForm.value.name;
    const description = this.addMovieForm.value.description;
    const url = this.addMovieForm.value.url;
    const movie: Movie = new Movie(1,name,description,url);
    this.store.dispatch(new MovieActions.AddMovie(movie));
    this.snotifyService.success(
      "You added a new movie to your gallery!",
      "Add Movie",
      {timeout: 3000}
    )
  }

}
