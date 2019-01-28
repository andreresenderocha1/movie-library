import { Component, OnInit, ElementRef } from '@angular/core';
import { Movie } from '../movie.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {AngularFirestore, QuerySnapshot, AngularFirestoreCollection} from '@angular/fire/firestore'
import { constructor } from 'core-js/library/es6/regexp';
import { Map } from 'core-js';
import {map} from 'rxjs/operators';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  movieState: Observable<{movies: Movie[]}>;  
  moviesToShow: any[] = []; 
  moviesArray: any[] = []; 
  faSearch = faSearch;
  constructor(private store: Store<{movieState: {movies : Movie[]}}>,
              private firebase: AngularFirestore) { }
  
              
  ngOnInit() {
    const refMovies = this.firebase.collection('movies').snapshotChanges()
      .subscribe(
        snapshots=>{
          snapshots.map(
            snapshot=>{
              const id = snapshot.payload.doc.id;
              const movie = <Movie>snapshot.payload.doc.data();
              this.moviesArray.push({id:id,movie: movie}) 
              this.moviesToShow = this.moviesArray.slice();            
            }
          )
        }
      )                 
  }

  onClick(event){
    
    if(event.target.value == ''){
      this.moviesToShow = this.moviesArray;
    }
    else{
      console.log(this.moviesArray)
      const newArray = this.moviesArray.filter(
        s=>{ return s.movie.name.toUpperCase().includes(event.target.value.toUpperCase())}
       )
       this.moviesToShow = newArray;
    }

    
  }
  
  // .subscribe(
  //   (snapshot)=>{
  //     console.log(snapshot.docs)
  //     snapshot.forEach(
  //       (doc)=>{              
  //         this.moviesIds.push(doc.id);                           
  //       }
  //     )         
  //   }

}
