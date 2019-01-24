import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.movie = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params['id']);
  }

}
