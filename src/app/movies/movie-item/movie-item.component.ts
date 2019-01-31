import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Movie } from '../movie.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import {faStar} from '@fortawesome/free-solid-svg-icons'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie;  
  
  imageUrlOb: Observable<string | null>;
  imageUrl;
  currentRate = 3;
  faStar = faStar
  rating :FormControl;
  fileExtension;

  constructor(private firebaseStore: AngularFirestore,
              private firebaseStorage: AngularFireStorage) { }

  ngOnInit() {
         this.rating = new FormControl([this.movie.movie.rating])
       
        const ref = this.firebaseStorage.ref('posters/'+this.movie.id);
        
          ref.getMetadata()
            .subscribe(
              data=>{
                const type = data.contentType;
                const indexSlash = type.indexOf('/');
                this.fileExtension = "."+type.slice(indexSlash+1,type.lenght)
              }
            )
            
           ref.getDownloadURL()           
             .subscribe(            
                data=> {
                  this.imageUrl = data + this.fileExtension;                
                }
             )

        
      
  }

}
