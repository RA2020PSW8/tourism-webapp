import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { EquipmentComponent } from 'src/app/feature-modules/administration/equipment/equipment.component';
import { UserComponent } from 'src/app/feature-modules/administration/users/user.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { BlogComponent } from 'src/app/feature-modules/blog/blog-display/blog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from 'src/app/feature-modules/administration/profile/profile.component';
import { KeypointComponent } from 'src/app/feature-modules/tour-authoring/keypoint/keypoint.component';
import { ClubInvitationComponent } from '../../feature-modules/tourist/club-invitation/club-invitation.component';
import { TourIssueComponent } from 'src/app/feature-modules/tour-execution/tour-issue/tour-issue.component';
import { ToursTestModuleComponent } from 'src/app/feature-modules/tour-authoring/tours-test-module/tours-test-module.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard],},
  {path: 'tourissue', component: TourIssueComponent, canActivate: [AuthGuard]},
  {path: 'blog', component:BlogComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],},
  {path: 'users', component: UserComponent, canActivate: [AuthGuard],},
  {path: 'keypoints', component: KeypointComponent, /*canActivate: [AuthGuard],*/},
  {path: 'clubInvitations', component: ClubInvitationComponent, canActivate: [AuthGuard], },
  {path: 'tours/maptest', component: ToursTestModuleComponent, /*canActivate: [AuthGuard]*/ },

];


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [RouterModule.forRoot(routes), CommonModule, FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
