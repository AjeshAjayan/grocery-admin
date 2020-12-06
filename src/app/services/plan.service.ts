import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Plan } from '../models/plan';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  async addPlan(plan: Plan) {
    await this.firestore.collection('shop_plans').add(plan)
  }

  getAllPlans() {
    return this.firestore.collection('shop_plans').snapshotChanges()
  }

  async delete(id: string) {
    await this.firestore.collection('shop_plans').doc(id).delete();
  }

  getById(docId: string) {
    return this.firestore.collection('shop_plans').doc(docId).snapshotChanges();
  }

  async update(plan: Plan) {
    await this.firestore.collection('shop_plans').doc(plan.id)
      .set(plan, {merge: true})
  }
}
