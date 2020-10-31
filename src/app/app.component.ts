import { Component } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "black-dashboard-angular";

  constructor(
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth,
    private notificationService: NotificationService,
  ) { 
    this.angularFireAuth.authState.subscribe(response => {
      if(response == null) {
        console.log('USER', response);
        this.authService.signIn();
      }   
    }, error => {
      console.log(error);
      this.notificationService.quickError(3000);
    });
  }

}
