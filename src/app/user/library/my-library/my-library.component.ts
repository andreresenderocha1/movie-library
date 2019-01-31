import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.css']
})
export class MyLibraryComponent implements OnInit {
  libraryItems: string[];
  subs = new Subscription();
  @ViewChild('target') target: ElementRef;
  @ViewChild('ca') ca:ElementRef;
  @ViewChild('btnCancel') btnCancel:ElementRef;
  ele : Element;
  flag=false;
  c=0;
  myTime;
  constructor(private firebaseStore: AngularFirestore,
              private angularFireAuth: AngularFireAuth,
              private dragulaService: DragulaService,
              private render2: Renderer2) { 


      // dragulaService.createGroup("VAMPIRES",{
      //   removeOnSpill: true
      // })
  }

  ngOnInit() {
    this.subs.add(this.dragulaService.drop("MOVIES")
      .subscribe(({ el,target,source,sibling }) => {
         if(target.id ==="trash"){             
          this.render2.setStyle(this.btnCancel.nativeElement,"display","block")
             console.log(this.libraryItems)
            //  this.conta();
            this.flag=true;
             this.myTime = setTimeout(()=>{
                let indexToExclude = this.libraryItems.indexOf(target.id);             
                this.libraryItems.splice(indexToExclude,1);
                this.render2.setStyle(this.btnCancel.nativeElement,"display","none")
                this.flag=false;
             },5000)
         }        
      })
    );

    let idLoggedUser = this.angularFireAuth.auth.currentUser.uid;
    this.firebaseStore.collection('userLibrary').doc(idLoggedUser).get()
      .subscribe(
        result=> {
          if(result.data()){
            this.libraryItems = result.data().libraryItems;            
          }
        }
      )
  }

  click(){
    
     this.render2.setStyle(this.btnCancel.nativeElement,"display","none")
     clearTimeout(this.myTime)
     this.render2.appendChild(this.ca.nativeElement,this.ele)
    
    
  }
  conta(){
    this.c++;
    console.log(this.c);
    if(this.c === 1000) return;
    else{
      setTimeout(()=>this.conta(),10)
    }
  }

}
