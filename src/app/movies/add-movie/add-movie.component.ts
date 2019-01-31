import * as MovieActions from '../movie.actions'

import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { Movie } from '../movie.model';
import { Store } from '@ngrx/store';
import { SnotifyService } from 'ng-snotify';
import { AngularFireStorage } from '@angular/fire/storage';
import { faStar, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  addMovieForm: FormGroup;
  faStar = faStar;
  faCloudUploadAlt = faCloudUploadAlt;
  file;
  imagePath: string | ArrayBuffer;
  flagUploadedImage=false;

  constructor(private store: Store<{movieState: {movies: Movie[]}}>,
              private snotifyService:SnotifyService,
              private firebaseStorage: AngularFireStorage,
              private firebaseStore: AngularFirestore) { }

  ngOnInit() {
    this.addMovieForm = new FormGroup({      
      'description': new FormControl(null),
      'name': new FormControl(null),
      'ratingStars': new FormControl(null)
    });
  }

  
  onSubmit(){
    const name = this.addMovieForm.value.name;
    const description = this.addMovieForm.value.description;
    const rating = this.addMovieForm.value.ratingStars;    
    const newMovie: Movie = new Movie(name,description,rating);
    // this.store.dispatch(new MovieActions.AddMovie(movie));
    this.firebaseStore.collection('movies').add({
      name: name,
      description: description,
      rating: rating
    })
      .then(
        (docRef)=>{
          const filePath = 'posters/'+docRef.id;
          const ref = this.firebaseStorage.ref(filePath);
          const task = ref.put(this.file);
          this.snotifyService.success(
            "You added a new movie!",
            "Add Movie",
            {timeout: 3000}
          )
          this.flagUploadedImage=false;
        }
      )
      .catch(
        (error)=>{
          this.snotifyService.error(
            "Sorry, you must be logged in!",
            "Access Denied",
            {timeout: 3000}
          )
        }
      )
    
  }

  upload(event){
    this.file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      this.flagUploadedImage = true;
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imagePath = reader.result;

      reader.readAsDataURL(file);
  }   
    
  }

}
