import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { EquipmentComponent } from 'src/app/feature-modules/administration/equipment/equipment.component';
import { UserComponent } from 'src/app/feature-modules/administration/users/user.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { TouristEquipmentComponent } from 'src/app/feature-modules/tourist/tourist-equipment/tourist-equipment.component';
import { BlogComponent } from 'src/app/feature-modules/blog/blog-display/blog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from 'src/app/feature-modules/administration/profile/profile.component';
import { KeypointComponent } from 'src/app/feature-modules/tour-authoring/keypoint/keypoint.component';
import { TourComponent } from 'src/app/feature-modules/tour-authoring/tour/tour.component';
import { ClubInvitationComponent } from '../../feature-modules/tourist/club-invitation/club-invitation.component';
import { TourIssueComponent } from 'src/app/feature-modules/tour-execution/tour-issue/tour-issue.component';
import { ObjectComponent } from 'src/app/feature-modules/tour-authoring/object/object.component';
import { ToursTestModuleComponent } from 'src/app/feature-modules/tour-authoring/tours-test-module/tours-test-module.component';
import { ToursPreviewComponent } from 'src/app/feature-modules/tour-authoring/tours-preview/tours-preview.component';
import { ClubJoinRequestsComponent } from 'src/app/feature-modules/tourist/club-join-requests/club-join-requests.component';
import { TourReviewComponent } from 'src/app/feature-modules/tour-execution/tour-review/tour-review.component';
import { ClubsComponent } from 'src/app/feature-modules/tourist/clubs/clubs.component';
import { TourPreferenceComponent } from 'src/app/feature-modules/marketplace/tour-preference/tour-preference.component';
import { AppRatingComponent } from 'src/app/feature-modules/administration/app-rating/app-rating.component';
import { AppRatingFormComponent } from 'src/app/feature-modules/administration/app-rating-form/app-rating-form.component';
import { AppRatingHomeComponent } from 'src/app/feature-modules/administration/app-rating-home/app-rating-home.component';
import { AppRatingFormAuthorComponent } from 'src/app/feature-modules/administration/app-rating-form-author/app-rating-form-author.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'touristSelectingEquipment', component: TouristEquipmentComponent, canActivate: [AuthGuard]},
  {path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard],},
  {path: 'tour-review', component: TourReviewComponent},
  {path: 'clubs', component: ClubsComponent, canActivate: [AuthGuard]}, 
  {path: 'tourissue', component: TourIssueComponent, canActivate: [AuthGuard]},
  {path: 'blog', component:BlogComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],},
  {path: 'users', component: UserComponent, canActivate: [AuthGuard],},
  {path: 'keypoints', component: KeypointComponent, canActivate: [AuthGuard],},
  {path: 'tourPreference', component: TourPreferenceComponent, canActivate: [AuthGuard],},
  {path: 'appRatingList', component: AppRatingComponent, canActivate: [AuthGuard]},
  {path: 'appRating', component: AppRatingFormComponent, canActivate: [AuthGuard]},
  {path: 'appRatingHome', component: AppRatingHomeComponent, canActivate: [AuthGuard]},
  {path: 'appRatingAuthor', component: AppRatingFormAuthorComponent, canActivate: [AuthGuard]},
  {path: 'clubInvitations', component: ClubInvitationComponent, canActivate: [AuthGuard], },
  {path: 'clubJoinRequests', component: ClubJoinRequestsComponent, canActivate: [AuthGuard], },
  {path: 'tours', component: TourComponent, canActivate: [AuthGuard]},
  {path: 'tours-equipment', component: ToursPreviewComponent, canActivate: [AuthGuard],},
  {path: 'objects',  component: ObjectComponent, canActivate: [AuthGuard]},
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
