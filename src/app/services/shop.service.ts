import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(
    private notificationService: NotificationService,
    private firestore: AngularFirestore
  ) { }

  getAllShops() {
    return this.firestore.collection('shop_users')
      .snapshotChanges();
  }
}
