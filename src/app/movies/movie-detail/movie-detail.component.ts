import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieId: string;
  movie: Movie;
  imageUrl: string;
  rating: FormControl;

  constructor(private route: ActivatedRoute,
              private store: Store<{movieState: {movies: Movie[]}}>,
              private firestore: AngularFirestore,
              private firestoreStorage: AngularFireStorage) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.params['id'];
    this.firestore.collection('movies').doc(this.movieId).valueChanges()
      .subscribe(
        (data)=>{
          this.movie = <Movie>data;
          const ref = this.firestoreStorage.ref('posters/'+this.movieId)
          ref.getDownloadURL()
            .subscribe(
              data =>
                this.imageUrl = data + ".jpeg"
            )          
        }
      )
    // this.store.select('movieState')
    //   .subscribe(
    //     data =>{
          
    //       this.movie = data.movies.find(movie=>{
    //         // return movie.id == this.movieId
    //       })
                 
    //     }
    //   )
  }

}
