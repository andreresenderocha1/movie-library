import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-my-library-item',
  templateUrl: './my-library-item.component.html',
  styleUrls: ['./my-library-item.component.css']
})
export class MyLibraryItemComponent implements OnInit {
  @Input() itemLibrary;
  fileExtension;
  imageUrl;
  constructor(private angularFireStorage: AngularFireStorage) { }

  ngOnInit() {
    let ref = this.angularFireStorage.ref('posters/' + this.itemLibrary);
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
