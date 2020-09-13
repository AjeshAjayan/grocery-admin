import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Manager } from 'src/app/models/manager';
import { MangerService } from 'src/app/services/manger.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-manages',
  templateUrl: './manages.component.html',
  styleUrls: ['./manages.component.scss']
})
export class ManagesComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  managers: Manager[] = [];

  constructor(
    private mangerService: MangerService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.mangerService.getAllManagers().subscribe((response) => {
        this.managers = response.map((res) => {
          return { ...res.payload.doc.data() as Manager, id: res.payload.doc.id };
        })
      }, error => {
        this.notificationService.notify('Oops something went wrong', 'Error', 'error', 3000);
        console.error(error);
      })
    );
  }

  deleteManager(id: string) {
    const toster = this.notificationService.quickLoaderDeleting();
    this.mangerService.delete(id).then(() => {
      toster.toastRef.close();
      this.notificationService.quickDeleted();
    }).catch(error => {
      console.error(error);
      this.notificationService.quickError(3000);
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => {
      s.unsubscribe();
    })
  }
}
