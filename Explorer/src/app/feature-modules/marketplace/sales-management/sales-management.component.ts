import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouteInfo} from "../../../shared/model/routeInfo.model";
import {RouteQuery} from "../../../shared/model/routeQuery.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PagedResults} from "../../../shared/model/paged-results.model";
import {Sale} from "../model/sale.model";
import {MarketplaceService} from "../marketplace.service";
import {Tour} from "../../tour-authoring/model/tour.model";
import {TourAuthoringService} from "../../tour-authoring/tour-authoring.service";

@Component({
  selector: 'xp-sales-management',
  templateUrl: './sales-management.component.html',
  styleUrls: ['./sales-management.component.css']
})
export class SalesManagementComponent {
  @Output() saleUpdated = new EventEmitter<Sale>();
  @Output() routeFound = new EventEmitter<RouteInfo>();

  @Input() tourId: number;
  @Input() routeQuery: RouteQuery;
  @Input() selectedSale: Sale;
  @Input() salesCount: number = 0;
  @Input() mode: string = 'add';
  public tours: Tour[];
  public sales: Sale[];
  public saleForm: FormGroup;
  public availableTours: Tour[];
  public selectedTours: Tour[] = [];


  constructor(private marketplaceService: MarketplaceService, private tourAuthoringService: TourAuthoringService) {
    this.saleForm = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      percentage: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    });
  }

  ngOnInit(): void {
    this.marketplaceService.getPublishedByAuthor().subscribe(result => {
      this.availableTours = result.results;
    });
    this.marketplaceService.getSalesByAuthor().subscribe(result => {
      this.sales = result.results;
    });
  }

  ngOnChanges(): void {
    this.saleForm.reset();
    if(this.mode === 'edit') {
      this.saleForm.patchValue(this.selectedSale);
    }
  }

  addSale(): void {
    if (this.tourId === 0) {
      window.alert('You cannot add a sale to an undrafted tour');
    } else if (!this.saleForm.valid) {
      window.alert('Form invalid');
    } else if (!this.isValidDateRange()) {
      window.alert(
        'Invalid date range. End date must be at least 2 weeks before the start of the tour.'
      );
    }
      else{
      let sale: Sale = {
        userId: parseInt(localStorage.getItem('loggedId')??'2'),
        startDate: this.saleForm.value.endDate.toISOString().split('T')[0] || "",
        endDate: this.saleForm.value.startDate.toISOString().split('T')[0] || "",
        percentage: this.saleForm.value.percentage || 0,
      };

      if(this.mode === 'add'){
        this.marketplaceService.addSale(sale).subscribe({
          next: () => {
            this.saleUpdated.emit();
            this.saleForm.reset();
            this.saleForm.clearValidators();
          }
        });
      }else if( this.mode === 'edit'){
        sale.id = this.selectedSale.id;
        this.marketplaceService.updateSale(sale).subscribe({
          next: () => {
            window.alert(`You have successfuly updated sale`);
            this.saleUpdated.emit();
            this.saleForm.reset();
            this.saleForm.clearValidators();
          }
        });
      }
    }
  }

  isValidDateRange(): boolean {
    const tourStatusUpdateTime = this.availableTours[0]?.statusUpdateTime; // Use optional chaining to handle potential undefined

    const startDate = new Date(this.saleForm.value.startDate);
    const endDate = new Date(this.saleForm.value.endDate);
    const twoWeeksBeforeTourStart = tourStatusUpdateTime
      ? new Date(tourStatusUpdateTime)
      : new Date(); // You might want to provide a default value or handle this case differently
    twoWeeksBeforeTourStart.setDate(twoWeeksBeforeTourStart.getDate() - 14);

    return true;
  }

  getSalesForAuthor() {
    this.marketplaceService.getSalesByAuthor().subscribe( sales => {
        this.sales = sales.results;
    });
  }

  selectSale(sale: Sale) {
    this.saleForm.patchValue(sale);
  }

  routeFoundEmit(routeInfo: RouteInfo){
    this.routeFound.emit(routeInfo);
  }

  selectTour(tour: Tour): void {
    // Move tour from availableTours to selectedTours
    this.availableTours = this.availableTours.filter((t) => t.id !== tour.id);
    this.selectedTours.push(tour);
  }

  removeTour(tour: Tour): void {
    // Move tour from selectedTours to availableTours
    this.selectedTours = this.selectedTours.filter((t) => t.id !== tour.id);
    this.availableTours.push(tour);
  }
}
