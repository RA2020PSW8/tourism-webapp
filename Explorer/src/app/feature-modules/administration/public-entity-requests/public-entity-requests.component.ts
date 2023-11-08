import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PublicEntityRequest } from '../../tour-authoring/model/public-entity-request.model';
import { AdministrationService } from '../administration.service';
import { PagedResults } from 'src/app/shared/model/paged-results.model';


@Component({
  selector: 'xp-public-entity-requests',
  templateUrl: './public-entity-requests.component.html',
  styleUrls: ['./public-entity-requests.component.css']
})
export class PublicEntityRequestsComponent implements OnInit{

  requests: PublicEntityRequest[] = [];
  constructor(private service: AdministrationService) {  }

  ngOnInit(): void {
    this.service.getAllRequests().subscribe({
      next: (result: PagedResults<PublicEntityRequest>) => {
        this.requests = result.results
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  approveRequest(request: PublicEntityRequest): void{

  }

  declineRequest(request: PublicEntityRequest): void{
    
  }

  
}
