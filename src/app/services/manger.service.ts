import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { of } from 'rxjs';
import { Manager } from '../models/manager';
import { NotificationService } from './notification.service';
import Axios from 'axios';
import { environment } from 'src/environments/environment';
import { Pincode } from '../models/pincode';

@Injectable({
  providedIn: 'root'
})
export class MangerService {

  constructor(
    private firestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  addManager(manger: Manager, pincodes: Pincode[]) {
    const toster = this.notificationService.notify('Saving...', '', 'info');

    // create user
    this.angularFireAuth.auth.createUserWithEmailAndPassword(manger.email, manger.password)
      .then(response => {
        manger.uid = response.user.uid;
        manger.assignedPincodes = pincodes;

        // add manager ang pincode to firebase
        this.firestore.collection('managers').add(manger).then(response => {
          toster.toastRef.close();
          this.notificationService.notify('Success', 'Saved', 'success', 3000);
          this.router.navigate(['/managers'])
        }).catch(error => {
          toster.toastRef.close();
          this.notificationService.notify(error.message, '', 'error', 3000);
          return of(null);  
        });
      })
      .catch(error => {
        toster.toastRef.close();
        this.notificationService.notify(error.message, '', 'error', 3000);
        return of(null);
      });

    // send mail to manager
  }

  getAllManagers = () => this.firestore.collection(
    'managers',
    ref => ref.where("isDeleted", "==", false)
  ).snapshotChanges();

  getByID = (id: string) => {
    return this.firestore.collection('managers')
      .doc(id)
      .snapshotChanges();
  }

  update(manager: Manager) {
    // send mail to manager
    return this.firestore.collection('managers')
      .doc(manager.id)
      .set(manager, { merge: true });
  }

  delete = (id: string) => this.firestore.collection('managers')
    .doc(id)
    .delete();

  deleteUserFromAuth = async (uid: string) => {
    try {
      await Axios.post(environment.baseUrlCloudFn + 'deleteUser', { uid })
    } catch (e) {
      console.log(e);

      this.notificationService.quickError(3000);
    }
  }
}
