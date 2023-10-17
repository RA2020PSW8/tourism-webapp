import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { User , UserRole} from '../model/user.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { CommonModule } from '@angular/common'
       

@Component({
  selector: 'xp-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  
  
  constructor(private service: AdministrationService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  

  getUsers(): void {
    this.service.getUsers().subscribe({
      next: (result: PagedResults<User>) => {
        this.users = result.results;
      },
      error: () => {
      }
    })
  }


  
  getRoleName(role: UserRole): string {
    switch (role) {
      case UserRole.Administrator:
        return 'Administrator';
      case UserRole.Author:
        return 'Author';
      case UserRole.Tourist:
        return 'Tourist';
      default:
        return 'Unknown';
    }
  }
  blockUser(user: User): void {
    user.isBlocked = true; // Update the user's IsBlocked property
    this.service.updateUser(user).subscribe({
      next: (updatedUser: User) => {
        // User updated successfully
      },
      error: () => {
        // Handle error
      }
    })
  }
  unblockUser(user: User): void {
    user.isBlocked = false; // Update the user's IsBlocked property
    this.service.updateUser(user).subscribe({
      next: (updatedUser: User) => {
        // User updated successfully
      },
      error: () => {
        // Handle error
      }
    })
  }

}
