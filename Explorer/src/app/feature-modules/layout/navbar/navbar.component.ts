import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { LayoutService } from '../layout.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { NotificationModel } from '../model/notification.model';

@Component({
  selector: 'xp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User | undefined;
  notifications: NotificationModel[] = [];

  constructor(private authService: AuthService, private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
    this.getNotifications();
  }

  onLogout(): void {
    this.authService.logout();
  }

  getNotifications(): void {
    this.layoutService.getNotifications().subscribe({
      next: (result: PagedResults<NotificationModel>) => {
        this.notifications = result.results;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  markAsRead(notification: NotificationModel): void {
    this.layoutService.markAsRead(notification).subscribe({
      next: () => {
        this.getNotifications();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  delete(notificationId: number): void {
    this.layoutService.delete(notificationId).subscribe({
      next: () => {
        this.getNotifications();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
