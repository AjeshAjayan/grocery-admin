import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Plan } from 'src/app/models/plan';
import { NotificationService } from 'src/app/services/notification.service';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  subscriptions: Subscription[] = [];

  plans: Plan[] = [];

  constructor(
    private _planService: PlanService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._planService.getAllPlans().subscribe((response) => {
        this.plans = response.map((res) => {
          return { ...res.payload.doc.data() as Plan, id: res.payload.doc.id };
        })
      }, error => {
        this.notificationService.notify('Oops something went wrong', 'Error', 'error', 3000);
        console.error(error);
      })
    );
  }

  async addPlan() {
    const toster = this.notificationService.quickLoaderSaveing();
    await this._planService.addPlan({} as Plan);
    toster.toastRef.close();
  }

  deletePlan (id: string) {
    let isDelete = confirm('Do you want to delete this entry');
    if (isDelete) {
      const toster = this.notificationService.quickLoaderDeleting();
      this._planService.delete(id).then(async () => {
        toster.toastRef.close();
        this.notificationService.quickDeleted();
      }).catch(error => {
        console.error(error);
        this.notificationService.quickError(3000);
      })
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }

}
