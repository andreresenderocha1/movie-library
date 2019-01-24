import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{  
  title = 'admin-page';

  constructor(private dataStorageService: DataStorageService){}

  ngOnInit(){
    // this.dataStorageService.setMovies()
    //   .subscribe(
    //     (response: Response)=>{
    //       console.log(response);
    //     }
    //   )
  }
}
