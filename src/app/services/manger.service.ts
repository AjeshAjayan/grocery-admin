import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Manager } from '../models/manager';

@Injectable({
  providedIn: 'root'
})
export class MangerService {

  constructor(private firestore: AngularFirestore) { }

  addManager(manger: Manager) {
    return this.firestore.collection('managers').add(manger);
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

  update = (manager: Manager) => this.firestore.collection('managers')
    .doc(manager.id)
    .set(manager, { merge: true });

  delete = (id: string) => this.firestore.collection('managers')
    .doc(id)
    .delete(); 

}
