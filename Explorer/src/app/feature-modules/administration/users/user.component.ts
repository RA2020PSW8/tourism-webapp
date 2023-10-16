import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { User } from '../model/user.model';
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

}
