import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Plan } from 'src/app/models/plan';
import { NotificationService } from 'src/app/services/notification.service';
import { PlanService } from 'src/app/services/plan.service';

@Component({
  selector: 'app-plan-manage',
  templateUrl: './plan-manage.component.html',
  styleUrls: ['./plan-manage.component.scss']
})
export class PlanManageComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  subscriptions: Subscription[] = [];

  isUpdate = false;

  plan: Plan = {
    id: '',
    name: '',
    no_of_images: 0,
    no_of_product: 0,
    plan_total_duration_in_days: 0,
    price: 0,
    product_expiry_in_days: 0,
    reach_radius_in_km: 0,
    description: '',
  }

  constructor(
    private _planService: PlanService,
    private _notificationService: NotificationService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    // get params
    this.subscriptions.push(
      this._activatedRoute.paramMap.subscribe(params => {
        this.plan.id = params.get('id');

        // update or add
        this.isUpdate = this.plan.id != '0' ? true : false;

        // get data
        if (this.isUpdate) {
          this._planService.getById(this.plan.id).subscribe(
            res => {
              this.plan = { ...res.payload.data() as Plan, id: res.payload.id }
            },
            err => {
              console.error(err);
              this._notificationService.quickError(4000);
            }
          );
        }
      })
    );
  }

  async onSubmit() {
    if (this.isUpdate) {
      // update
      const toster = this._notificationService.quickLoaderUpdating();
      await this._planService.update(this.plan)
      toster.toastRef.close();
      this._notificationService.quickUpdated();
      this._router.navigate(['/plans']);
    } else {
      if (this.form.valid) {
        const toster = this._notificationService.quickLoaderSaveing();
        await this._planService.addPlan(this.plan)
        toster.toastRef.close();
        this._notificationService.quickSaved();
        this._router.navigate(['/plans']);
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
