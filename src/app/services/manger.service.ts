import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Manager } from '../models/manager';

@Injectable({
  providedIn: 'root'
})
export class MangerService {

  constructor(private firestore: AngularFirestore) { }

  addManager(manger: Manager) {
    return this.firestore.collection('managers').add(manger);
  }

  getAllManagers() {
    return this.firestore.collection('managers').snapshotChanges();
  }
}
