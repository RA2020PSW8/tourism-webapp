// user.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { User, UserRole } from '../model/user.model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';



@Component({
  selector: 'xp-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Output() userUpdated = new EventEmitter<null>();

  users: User[] = [];
  showAddUser: boolean = false;
  
  newUser: User = {
    username: '',
    password: '',
    isActive: true,
    role: 0,
    mail: '',
    isBlocked: false,
    isEditing: false,
  };

  constructor(private service: AdministrationService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.service.getUsers().subscribe({
      next: (result: PagedResults<User>) => {
        this.users = result.results;
        this.initializeIsEditing();
      },
      error: () => {},
    });
  }

  enableEditing(user: User): void {
    // Disable editing for all other users
    this.users.forEach((u) => (u.isEditing = false));
    
    // Enable editing for the selected user
    user.isEditing = true;
  }

  updateUser(user: User): void {
    // Save user changes, update the user on the server, and disable edit mode
    user.isEditing = false;

    this.service.updateUser(user).subscribe({
      next: (updatedUser: User) => {},
      error: () => {},
    });
  }

  deleteUser(id: number): void {
    this.service.deleteUser(id).subscribe({
      next: () => {
        this.getUsers();
      },
    });
  }

  showAddUserForm(): void {
    
    this.showAddUser = true;
    
  }
  // Inside your component class
closeAddUserForm() {
  this.showAddUser = false;
  // You can also reset any form fields or data if needed
}


  addUser(): void {
    this.users.push({ ...this.newUser });
    this.service.addUser(this.newUser).subscribe({
      next: () => { this.userUpdated.emit() }
    });
    // Reset the new user object
    this.newUser = {
      username: '',
      password: '',
      isActive: true,
      role: 0,
      mail: '',
      isBlocked: false,
      isEditing: false,
    };

    // Hide the add user form
    this.showAddUser = false;
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
    user.isBlocked = true;
    this.service.updateUser(user).subscribe({
      next: (updatedUser: User) => {},
      error: () => {},
    });
  }

  unblockUser(user: User): void {
    user.isBlocked = false;
    this.service.updateUser(user).subscribe({
      next: (updatedUser: User) => {},
      error: () => {},
    });
  }

  private initializeIsEditing() {
    this.users.forEach((user) => (user.isEditing = false));
  }
}
