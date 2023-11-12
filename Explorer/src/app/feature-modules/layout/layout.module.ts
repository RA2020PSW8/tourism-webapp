import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from 'src/app/infrastructure/material/material.module';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from '../administration/profile/profile.component';
import { AdministrationModule } from '../administration/administration.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MarketplaceModule } from "../marketplace/marketplace.module";
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    AdministrationModule,
    MatGridListModule,
    MarketplaceModule,
    MatMenuModule,
  ],
  exports: [
    NavbarComponent,
    HomeComponent,
    AdministrationModule,
    MatGridListModule,
  ]
})
export class LayoutModule { }
