import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

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
  libraryItems: string[] = [];

  constructor(private route: ActivatedRoute,
              private store: Store<{movieState: {movies: Movie[]}}>,
              private firebaseStore: AngularFirestore,
              private firebaseStorage: AngularFireStorage,
              private firebaseAuth: AngularFireAuth) { }

  ngOnInit() {
    this.movieId = this.route.snapshot.params['id'];
    this.firebaseStore.collection('movies').doc(this.movieId).valueChanges()
      .subscribe(
        (data)=>{
          this.movie = <Movie>data;
          const ref = this.firebaseStorage.ref('posters/'+this.movieId)
          ref.getDownloadURL()
            .subscribe(
              data =>
                this.imageUrl = data + ".jpeg"
            )          
        }
      )    
  }

  onAddToLibrary(){
    let userId = this.firebaseAuth.auth.currentUser.uid;  
    let refDoc = this.firebaseStore.collection('userLibrary').doc(userId);

    refDoc.get().subscribe(
      (snapshot)=>{
        if(!snapshot.exists){
          this.libraryItems.push(this.movieId)
        this.firebaseStore.collection('userLibrary').doc(userId).set({
          libraryItems: this.libraryItems
        })        
      }
    })
      
      
    this.firebaseStore.collection('userLibrary').doc(userId).get()
      .subscribe(
        result => {
          if(result.data()){
            this.libraryItems = result.data().libraryItems   
            if(!this.libraryItems.includes(this.movieId)){
              this.libraryItems.push(this.movieId);
              this.firebaseStore.collection('userLibrary').doc(userId).set({
                libraryItems: this.libraryItems
               
              })  
              console.log("adicionado")
            }
          }
          
             
        }
      )    
    
    
  }

}
