import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Encounter } from '../encounters-preview/model/encounter.model';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
      type: new FormControl('', [Validators.required]),
      range: new FormControl('', [Validators.min(1)]),
      //napravi validatore za ova polja
      image: new FormControl(''),
      peopleCount: new FormControl(null),
    });

    /*this.encounterForm.get('peopleCount')?.valueChanges.subscribe(() => {
      this.encounterForm.get('peopleCount')?.updateValueAndValidity();
    });*/
  }

  ngOnChanges(): void {
    this.encounterForm.reset();
    if(this.mode === 'edit') {
      this.encounterForm.patchValue(this.selectedEncounter);
    }
  }
  /*customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const type = this.encounterForm.get('type')?.value;
      const peopleCount = this.encounterForm.get('peopleCount')?.value;
  
      if (type === 'LOCATION' && peopleCount < 1) {
        return { invalidPeopleCount: true, message: 'For LOCATION type, at least 1 person is required.' };
      }
      return null;
    };
  }*/

  saveEncounter(): void {
    let encounter: Encounter = {
      name: this.encounterForm.value.name || "",
      description: this.encounterForm.value.description || "",
      latitude: this.encounterForm.value.latitude || 0,
      longitude: this.encounterForm.value.longitude || 0,
      xp: this.encounterForm.value.xp || 10,
      status: this.encounterForm.value.status || 'DRAFT', 
      type: this.encounterForm.value.type || 'SOCIAL',
      range: this.encounterForm.value.range || 0,
      image: this.encounterForm.value.image,
      peopleCount: this.encounterForm.value.peopleCount
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
