import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'xp-newsletter-preference',
  templateUrl: './newsletter-preference.component.html',
  styleUrls: ['./newsletter-preference.component.css']
})
export class NewsletterPreferenceComponent {
  newsletterForm: FormGroup

  public constructor()
  {
    this.newsletterForm = new FormGroup({
      frequency: new FormControl('0', [Validators.required]),
    });
  }

  reset()
  {
    this.newsletterForm.setValue({frequency:'0'})
  }
}
