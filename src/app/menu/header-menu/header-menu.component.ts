import * as MovieActions from '../../movies/movie.actions'

import { Component, OnInit } from '@angular/core';
import { faAlignJustify, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Store } from '@ngrx/store';
import { Movie } from 'src/app/movies/movie.model';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  faAlignJustify = faAlignJustify;
  faCoffee = faCoffee;

  constructor(private dataStorageService: DataStorageService,
              private store: Store<{movie: {movies: Movie[]}}>) { }

  ngOnInit() {

  }

  onclick(){
      this.store.dispatch(new MovieActions.AddMovie(new Movie(3,"Noviça","Sensacional","https://ingresso-a.akamaihd.net/img/cinema/cartaz/13027-cartaz.jpg")))
  }

}
