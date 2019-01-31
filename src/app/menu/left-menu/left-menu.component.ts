import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  flagLoggedin = false;
  constructor(private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.angularFireAuth.user
      .subscribe(
        user =>{
          if(user){
            this.flagLoggedin = true;
          }
        }
      )
    this.angularFireAuth.auth.onAuthStateChanged(
      result=>{
        if(!result){
          this.flagLoggedin = false;
        }
      }
    )
      
  }

}
