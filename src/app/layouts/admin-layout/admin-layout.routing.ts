import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { AddLocationComponent } from 'src/app/pages/add-location/add-location.component';
import { AddCatagoryComponent } from 'src/app/pages/add-catagory/add-catagory.component';
import { SetMarginComponent } from 'src/app/pages/set-margin/set-margin.component';
import { ComplaintsComponent } from 'src/app/pages/complaints/complaints.component';
import { ShopsComponent } from 'src/app/pages/shops/shops.component';
import { ManagesComponent } from 'src/app/pages/manages/manages.component';
import { ManageManagersComponent } from 'src/app/pages/manage-managers/manage-managers.component';
import { PlansComponent } from 'src/app/pages/plans/plans.component';
import { PlanManageComponent } from 'src/app/pages/plans/plan-manage/plan-manage.component';

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "shops", component: ShopsComponent },
  { path: "managers", component: ManagesComponent },
  { path: "manage-manager/:id", component: ManageManagersComponent },
  { path: "add-location", component: AddLocationComponent },
  { path: "add-catagory", component: AddCatagoryComponent },
  { path: "set-margin", component: SetMarginComponent },
  { path: "complaints", component: ComplaintsComponent },
  { path: "plans", component: PlansComponent },
  { path: "manage-plan/:id", component: PlanManageComponent },
];
