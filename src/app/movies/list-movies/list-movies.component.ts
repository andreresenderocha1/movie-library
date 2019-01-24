import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  movieState: Observable<{movies: Movie[]}>;  

  constructor(private store: Store<{movie: {movies : Movie[]}}>) { }

  ngOnInit() {
      this.movieState = this.store.select('movie');
      
        
  }

}
