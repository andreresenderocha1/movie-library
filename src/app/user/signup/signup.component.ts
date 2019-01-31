import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseApp, FirebaseAuth } from '@angular/fire';
import { ChangeInfosService } from 'src/app/shared/change-infos.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formSignup: FormGroup;

  constructor(private angularFireAuth: AngularFireAuth,
              private changeInfosService: ChangeInfosService) { }

  ngOnInit() {
    this.formSignup = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    })
  }

  onSubmit(){
    const email = this.formSignup.value.email;
    const password = this.formSignup.value.password;
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password)
      .catch(
        error=>console.log(error)
      )
  }

  onBackToLogin(){
    this.changeInfosService.backToLoginEmmiter.next()
  }

}
