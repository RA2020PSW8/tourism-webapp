import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouteInfo} from "../../../shared/model/routeInfo.model";
import {RouteQuery} from "../../../shared/model/routeQuery.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Sale} from "../model/sale.model";
import {MarketplaceService} from "../marketplace.service";
import {Tour} from "../../tour-authoring/model/tour.model";
import {TourAuthoringService} from "../../tour-authoring/tour-authoring.service";
import {TourSale} from "../model/tour-sale.model";

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
  displayedColumns: string[] = ['startDate', 'endDate', 'percentage', 'edit', 'manageTours', 'removeSale'];
  showForm: boolean = false;
  isTourManagementVisible = false;
  tourSale: TourSale;
    isEditing: boolean = false;

  constructor(private marketplaceService: MarketplaceService, private tourAuthoringService: TourAuthoringService) {
    this.saleForm = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      percentage: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    });
    this.tourSale = {} as TourSale;
  }

  ngOnInit(): void {
    this.showForm = false;
    this.marketplaceService.getPublishedByAuthor().subscribe(result => {
      this.availableTours = result.results;
    });
    this.marketplaceService.getSalesByAuthor().subscribe(result => {
      this.sales = result.results;
    });
  }
  collapse(){
    this.showForm = false;
      this.isEditing = false;
      this.selectedSale = {} as Sale; // Reset selectedSale when collapsing the form
      this.saleForm.reset(); // Reset the form
  }

  showAddSaleForm() {
      this.showForm = true;
      this.isEditing = false;
      this.selectedSale = {} as Sale; // Reset selectedSale when adding a new sale
      this.saleForm.reset(); // Reset the form
  }

  ngOnChanges(): void {
    this.saleForm.reset();
    if(this.mode === 'edit') {
      this.saleForm.patchValue(this.selectedSale);
    }
  }

    addSale(): void {
        if (!this.saleForm.valid) {
            window.alert('Form invalid');
        } else if (!this.isValidDateRange()) {
            window.alert(
                'Invalid date range. End date must be at least 2 weeks before the start of the tour.'
            );
        } else {
            let sale: Sale = {
                userId: parseInt(localStorage.getItem('loggedId') ?? '2'),
                startDate: this.saleForm.value.endDate.toISOString().split('T')[0] || "",
                endDate: this.saleForm.value.startDate.toISOString().split('T')[0] || "",
                percentage: this.saleForm.value.percentage || 0,
            };

            if (this.mode === 'add') {
                this.marketplaceService.addSale(sale).subscribe({
                    next: () => {
                        this.saleUpdated.emit();
                        this.getSalesForAuthor();
                        this.isEditing = false;
                        this.resetForm();
                    },
                    error: (error) => {
                        console.error('Failed to add tour to sale:', error);
                        if (error.error && error.error.message) {
                            window.alert(error.error.message);
                        } else {
                            window.alert('An error occurred while adding the tour to the sale. Please try again.');
                        }
                    },
                });
            } else if (this.mode === 'edit') {
                sale.id = this.selectedSale.id;
                this.marketplaceService.updateSale(sale).subscribe({
                    next: (result) => {
                        // Assuming that the result contains the updated sale
                        this.marketplaceService.getSalesByAuthor().subscribe(result => {
                          this.sales = result.results;
                          this.isEditing = false;
                        })
                        window.alert(`You have successfully updated sale`);
                        this.saleUpdated.emit();
                        this.resetForm();
                    },
                    error: (error) => {
                        console.error('Error updating sale:', error);
                        // Handle the error as needed
                    }
                });
            }
        }
    }

    resetForm(): void {
        this.showForm = false;
        this.isEditing = false;
        this.saleForm.reset();
        this.saleForm.clearValidators();
    }

    isValidDateRange(): boolean {
        const tourStatusUpdateTime = this.availableTours[0]?.statusUpdateTime;

        const startDate = new Date(this.saleForm.value.startDate);
        const endDate = new Date(this.saleForm.value.endDate);

        // Check if startDate is before endDate
        if (startDate >= endDate) {
            window.alert('End date must be after start date.');
            return false;
        }

        // Check if endDate is at least two weeks before tourStatusUpdateTime
        const twoWeeksBeforeTourStart = tourStatusUpdateTime
            ? new Date(tourStatusUpdateTime)
            : new Date();
        twoWeeksBeforeTourStart.setDate(twoWeeksBeforeTourStart.getDate() - 14);

        if (endDate < twoWeeksBeforeTourStart) {
            return true;
        } else {
            window.alert('End date must be at least 2 weeks before the start of the tour.');
            return false;
        }
    }


    getSalesForAuthor() {
    this.marketplaceService.getSalesByAuthor().subscribe( sales => {
        this.sales = sales.results;
    });
  }

    removeSale(sale: Sale): void {
        this.marketplaceService.removeSale(sale.id || 0).subscribe(result => {
            // Fetch the updated sales list from the backend
            this.marketplaceService.getSalesByAuthor().subscribe(updatedSales => {
                this.sales = updatedSales.results;
                alert("Discount successfully removed.")
            });
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

  toggleTourManagement(sale: Sale): void {
    this.selectedSale = sale;
    this.isTourManagementVisible = !this.isTourManagementVisible;
  }



    getAvailableTours(){
    this.marketplaceService.getPublishedByAuthor().subscribe( result => {
      this.availableTours = result.results;
    })
  }


    addTourToSelectedTours(tour: Tour): void {
        // Check if the tour is not already in the selectedTours array
        this.availableTours.splice(this.availableTours.indexOf(tour), 1);
        if (!this.selectedTours.some((selectedTour) => selectedTour.id === tour.id)) {
            this.selectedTours.push(tour);
        }
    }

    // Function to remove a tour from the selectedTours array
    removeTourFromSelectedTours(tourId: number): void {
        const indexToRemove = this.selectedTours.findIndex(tour => tour.id === tourId);

        if (indexToRemove !== -1) {
            this.selectedTours.splice(indexToRemove, 1);
        }
        this.selectedTours = this.selectedTours.filter((selectedTour) => selectedTour.id !== tourId);
    }

    editSale(sale: Sale): void {
        // Set the selectedSale property to the sale being edited
        this.selectedSale = sale;
        this.isEditing = true;

        // Update the mode to 'edit'
        this.mode = 'edit';

        // Open the form
        this.showForm = true;

        // Patch the form values with the data from the selectedSale
        this.saleForm.patchValue({
            startDate: new Date(sale.startDate),
            endDate: new Date(sale.endDate),
            percentage: sale.percentage,
        });
    }

    // ... (existing code)

    addTour(sale: Sale, tour: Tour): void {
        this.tourSale.saleId = sale.id || 0;
        this.tourSale.tourId = tour.id || 0;

        this.marketplaceService.addTourToSale(this.tourSale).subscribe(
            () => {
                // Update selectedTours after adding the tour to the sale
                this.addTourToSelectedTours(tour);

                // Display an alert when the tour is successfully added to the sale
                window.alert('Tour successfully added to sale!');
            },
            (error) => {
              console.error('Failed to add tour to sale:', error);
            }
        );
    }

    removeTour(sale: Sale, tour: Tour): void {
        this.tourSale.saleId = sale.id || 0;
        this.tourSale.tourId = tour.id || 0;
        this.availableTours.push(tour);
        this.selectedTours.splice(this.selectedTours.indexOf(tour, 1));
        this.marketplaceService.removeTourFromSale(this.tourSale.tourId).subscribe(() => {
            // Update selectedTours after removing the tour from the sale
            this.removeTourFromSelectedTours(tour.id || 0);
        });
    }

    // ... (existing code)

    getSelectedTours(): void {
        if (this.selectedSale && this.selectedSale.id) {
            // Find the selected sale in the array
            const selectedSale = this.sales.find((sale) => sale.id === this.selectedSale.id);

            if (selectedSale) {
                // Assuming the tourSales are stored in a property called 'tourSales' within the sale object
                const tourSales = selectedSale.tourSales || [];

                // Map tourSales to actual Tour objects, filtering out undefined values
                this.selectedTours = tourSales
                    .map((tourSale) => {
                        const tourId = tourSale.tourId;
                        return this.availableTours.find((tour) => tour.id === tourId);
                    })
                    .filter((tour): tour is Tour => tour !== undefined);
            }
        }
    }




}
