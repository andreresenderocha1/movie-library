import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { ChangeInfosService } from 'src/app/shared/change-infos.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  flagAuth;
  form: FormGroup;
  f: FormGroup;
 

  constructor(private angularFireAuth: AngularFireAuth,
              private changeInfosService: ChangeInfosService,
              private popoverConfig: NgbPopoverConfig) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    })
    this.f = new FormGroup({
          })
    this.angularFireAuth.auth.onAuthStateChanged(
      (user)=>{
        if(user){
          this.flagAuth = true
        }else{
          this.flagAuth = false
        }
        
      }
    )

    
      
      
      
    
  }

  logout(){
    this.angularFireAuth.auth.signOut()

  }
  onSubmit(){
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.angularFireAuth.auth.signInWithEmailAndPassword(email,password)
      .then(
        result => {
          let email = result.user.email;
          this.changeInfosService.userEmailEmitter.next(email);
        }
      )
      .catch(
        error=>console.log(error)
      )
  }

  loginFacebook(){
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(
        result =>{
           let token = result.credential.providerId;
           let user = result.user;    
           this.changeInfosService.userEmailEmitter.next(user.email);
          
        }
      )
  }

  onCreateAccount(){
    this.changeInfosService.createAccountEmitter.next()
  }

}



