import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Encounter } from '../encounters-preview/model/encounter.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EncountersService } from '../encounters.service';

@Component({
  selector: 'xp-encounter-form',
  templateUrl: './encounter-form.component.html',
  styleUrls: ['./encounter-form.component.css']
})
export class EncounterFormComponent implements OnChanges {
  @Output() encounterUpdated = new EventEmitter<Encounter>();
  
  @Input() mode: string = 'add';
  @Input() selectedEncounter: Encounter;

  public encounterForm: FormGroup;

  constructor(private encounterService: EncountersService) {
    this.encounterForm = new FormGroup ({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      latitude: new FormControl(0, [Validators.min(-90), Validators.max(90)]),
      longitude: new FormControl(0, [Validators.min(-180), Validators.max(180)]),
      xp: new FormControl(0, [Validators.min(1)]),
      status: new FormControl('', [Validators.required]), 
      type: new FormControl('', [Validators.required])
    })
  }

  ngOnChanges(): void {
    this.encounterForm.reset();
    if(this.mode === 'edit') {
      this.encounterForm.patchValue(this.selectedEncounter);
    }
  }

  saveEncounter(): void {
    let encounter: Encounter = {
      name: this.encounterForm.value.name || "",
      description: this.encounterForm.value.description || "",
      latitude: this.encounterForm.value.latitude || 0,
      longitude: this.encounterForm.value.longitude || 0,
      xp: this.encounterForm.value.xp || 10,
      status: this.encounterForm.value.status || 'DRAFT', 
      type: this.encounterForm.value.type || 'SOCIAL'
    };
    
    if(this.mode === 'add'){
      this.encounterService.addEncounter(encounter).subscribe({
        next: () => { 
          this.encounterUpdated.emit();
          this.encounterForm.reset();
        }
      });
    }else if( this.mode === 'edit'){
      encounter.id = this.selectedEncounter.id;
      this.encounterService.updateEncounter(encounter).subscribe({
        next: () => {
          this.encounterUpdated.emit(); 
          this.encounterForm.reset();
        }
      });
    } 
  }

  fillCoords(event: number[]): void {
    this.encounterForm.patchValue({
      latitude: event[0],
      longitude: event[1]
    })
  }
}
