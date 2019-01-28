import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseApp, FirebaseAuth } from '@angular/fire';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    })
  }

  onSubmit(){
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password)
      .catch(
        error=>console.log(error)
      )
  }

}
