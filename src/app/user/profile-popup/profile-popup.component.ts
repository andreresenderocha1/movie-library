import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrls: ['./profile-popup.component.css']
})
export class ProfilePopupComponent implements OnInit {

  constructor(private angularFireAuth: AngularFireAuth,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  logout(){
    this.angularFireAuth.auth.signOut()
    this.router.navigate(['/'])
  }

  onEditProfile(){
    this.router.navigate(['/edit-profile'])
  }

}
