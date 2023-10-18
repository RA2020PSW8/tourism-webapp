import { Component } from '@angular/core';
import { EquipmentForSelection } from '../model/eqipment-for-selection.model';
import { TouristService } from '../tourist.service';
import { TouristEquipment } from '../model/tourist-equipment.model';

@Component({
  selector: 'xp-tourist-equipment',
  templateUrl: './tourist-equipment.component.html',
  styleUrls: ['./tourist-equipment.component.css']
})
export class TouristEquipmentComponent {

  equipment: EquipmentForSelection[] = [];
  constructor(private service: TouristService) { }

  ngOnInit(): void {
    this.getEquipment();
  }
  getEquipment(): void {
    this.service.getEquipmentForSelection().subscribe({
      next: (result: EquipmentForSelection[]) => {
        this.equipment = result;
      },
      error: () => {
      }
    })
  }

  selectEquipment(equipmentId: any): void{
    const data: TouristEquipment = {
      touristId : 1,
      equipmentId : equipmentId
    }
    
    this.service.addSelectionEquipment(data).subscribe({
      next: () => {  }
    });

  }
}
