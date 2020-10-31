import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Shop } from 'src/app/models/shop';
import { NotificationService } from 'src/app/services/notification.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  subscription: Subscription[] = [];
  shops: Shop[] = [];

  constructor(
    private shopService: ShopService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getAllShops();
  }

  getAllShops() {
    const tostr = this.notificationService.quickLoaderFetch();
    this.subscription.push(
      this.shopService.getAllShops().subscribe(response => {
        this.shops = response.map(res => {
          return { ...res.payload.doc.data() as Shop, id: res.payload.doc.id };
        })
        tostr.toastRef.close();
      }, error => {
        console.log(error);
        tostr.toastRef.close();
        this.notificationService.quickError(4000);
      })
    );
  }

}
