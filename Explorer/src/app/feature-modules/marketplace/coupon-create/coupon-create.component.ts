import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../marketplace.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { Coupon } from '../model/coupon-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tourist } from '../model/tourist-model';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Tour } from '../../tour-authoring/model/tour.model';


@Component({
  selector: 'xp-coupon-create',
  templateUrl: './coupon-create.component.html',
  styleUrls: ['./coupon-create.component.css']
})
export class CouponCreateComponent {
  public coupon: Coupon;
  public couponForm : FormGroup;
  tourists: Tourist[] =  []; 
  tours: Tour[] = [];
  loggedId: number; 

  constructor(private marketplaceService: MarketplaceService, private authService: AuthService){
    this.coupon = {id: 0, code: '', discount: 0, tourId: 0, touristId:0, authorId: 0, expiryDate: new Date()}
    this.couponForm = new FormGroup({
      discount: new FormControl(1, Validators.min(1)),
      expiryDate: new FormControl('', Validators.required),
      tourId: new FormControl(null),
      touristId: new FormControl(null,[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loggedId = this.authService.user$.value.id; 
    this.getTourists(); 
    this.getTours(); 
  }

  getTourists(): void{
    this.marketplaceService.getAllTourists().subscribe({
      next: (result: PagedResults<Tourist>) => {
        this.tourists = result.results; 
         
      },
      error:(err: any) => {
        console.log(err); 
      }
    })
    
  }

  getTours(): void{
    this.marketplaceService.getAllToursForAuthor(this.loggedId).subscribe({
      next: (result:PagedResults<Tour>) => {
        this.tours = result.results;
         
      },
      error:(err: any) => {
        console.log(err); 
      }
    })
    
  }

  createCoupon(): void{
    
    let coupon: Coupon = {
      id: this.coupon.id,
      code: '',
      discount: this.couponForm.value.discount,
      tourId: this.couponForm.value.tourId,
      touristId: this.couponForm.value.touristId,
      authorId: this.loggedId,
      expiryDate: this.couponForm.value.expiryDate
    };

    this.marketplaceService.createCoupon(coupon).subscribe({
      next: () => { 
        window.alert("You have successfuly created coupon");
 
      },
      error:(err: any) => {
        console.log(err); 
      }
    })
    
  }
}
