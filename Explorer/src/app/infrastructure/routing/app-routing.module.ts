import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { EquipmentComponent } from 'src/app/feature-modules/administration/equipment/equipment.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { KeypointComponent } from 'src/app/feature-modules/tour-authoring/keypoint/keypoint.component';
import { ClubsComponent } from 'src/app/feature-modules/tourist/clubs/clubs.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'keypoints', component: KeypointComponent, canActivate: [AuthGuard],},
  {path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard],},
  {path: 'clubs', component: ClubsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
