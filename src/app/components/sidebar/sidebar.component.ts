import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/shops",
    title: "Shops",
    rtlTitle: "الرموز",
    icon: "icon-bank",
    class: ""
  },
  {
    path: "/managers",
    title: "Managers",
    rtlTitle: "الرموز",
    icon: "icon-bank",
    class: ""
  },
  {
    path: "/add-location",
    title: "Add Location",
    rtlTitle: "خرائط",
    icon: "icon-square-pin",
    class: "" },
  {
    path: "/add-catagory",
    title: "Add Catagory",
    rtlTitle: "إخطارات",
    icon: "icon-bullet-list-67",
    class: ""
  },
  {
    path: "/plans",
    title: "Create Shop Plans",
    rtlTitle: "قائمة الجدول",
    icon: "icon-delivery-fast",
    class: ""
  },
  {
    path: "/complaints",
    title: "Complaints",
    rtlTitle: "طباعة",
    icon: "icon-alert-circle-exc",
    class: ""
  },
  {
    path: "/reports",
    title: "Reports",
    rtlTitle: "ار تي ال",
    icon: "icon-book-bookmark",
    class: ""
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
