import * as MovieActions from '../../movies/movie.actions'

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faAlignJustify, faCoffee, faUser } from '@fortawesome/free-solid-svg-icons';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Store } from '@ngrx/store';
import { Movie } from 'src/app/movies/movie.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgbPopoverConfig, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { ChangeInfosService } from 'src/app/shared/change-infos.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css'],
  providers: [NgbPopoverConfig]
})
export class HeaderMenuComponent implements OnInit {
  faAlignJustify = faAlignJustify;
  faCoffee = faCoffee;
  faUser = faUser;
  flagLogin = false;
  userEmail;
  flagShowPopupLogin = false;
  flagShowPopupSignup = false;
  flagShowPopupProfile = false;
  flagShowIconLogin = false;
  flagShowIconSignup = false;
  flagShowIconProfile = false;
  @ViewChild('popupProfile') pop: ElementRef;

  constructor(private dataStorageService: DataStorageService,
              private angularFireAuth: AngularFireAuth,
              private changeInfosService:ChangeInfosService,
              private popoverConfig : NgbPopoverConfig,
              private store: Store<{movie: {movies: Movie[]}}>) { }

  ngOnInit() {
    this.changeInfosService.userEmailEmitter
      .subscribe(
        (email: string)=>{
          this.userEmail = email;
          this.flagShowPopupLogin = true;
          this.flagShowIconProfile = true;
        }
      )

    this.changeInfosService.createAccountEmitter
      .subscribe(
        ()=>{
          // this.flagSignup = true;
          this.flagShowIconLogin = false;
          this.flagShowIconSignup = true;
          this.flagShowPopupSignup = true;
        }
      )

      this.changeInfosService.backToLoginEmmiter
        .subscribe(
          ()=>{
            this.flagShowIconSignup = false;
            this.flagShowIconLogin = true;
            this.flagShowPopupLogin = true;
          }
        )
    

   this.angularFireAuth.user
     .subscribe(
       user=> {
         if(user){
          this.userEmail = user.email
          this.flagShowIconProfile = true;
         }else{
           this.flagShowIconLogin = true;
         }
         
        }
     )    
      
    this.angularFireAuth.auth.onAuthStateChanged(
      user=>{
        if(user){          
          this.flagShowIconProfile = true;
          this.flagShowIconLogin = false;
          this.flagShowIconSignup = false;
        }else{
          this.flagShowPopupProfile = false;
          this.flagShowIconProfile = false;
          this.flagShowIconLogin = true;
        } 
      }
    )
  }

  onclick(){
    this.pop.nativeElement.popover('hide')
    
  }
}
