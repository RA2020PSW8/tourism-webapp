import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { User } from 'src/app/infrastructure/auth/model/user.model';
import { LayoutService } from '../layout.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { NotificationModel } from '../model/notification.model';
import { Router } from '@angular/router';

@Component({
  selector: 'xp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User | undefined;
  showOldToolbar: boolean = false;
  notifications: NotificationModel[] = [];
  unreadNotificationsCount: number = 0;

  constructor(private authService: AuthService, private layoutService: LayoutService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.getNotifications();
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  toggleOldToolbar(): void {
    this.showOldToolbar = !this.showOldToolbar;
  }

  getNotifications(): void {
    this.layoutService.getNotifications().subscribe({
      next: (result: PagedResults<NotificationModel>) => {
        this.notifications = result.results;
        this.unreadNotificationsCount = this.notifications.filter(n => !n.isRead).length;
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
        this.unreadNotificationsCount -= 1;
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

  redirect(actionURL: string): void {
    if(actionURL){
      this.router.navigate([actionURL]);
    }
  }
}
