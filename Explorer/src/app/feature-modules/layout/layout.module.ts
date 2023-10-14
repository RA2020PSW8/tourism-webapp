import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from '../administration/profile/profile.component';
import { AdministrationModule } from '../administration/administration.module';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    AdministrationModule
  ],
  exports: [
    NavbarComponent,
    HomeComponent, 
    AdministrationModule
  ]
})
export class LayoutModule { }
