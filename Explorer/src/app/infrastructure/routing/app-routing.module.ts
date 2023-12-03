import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/feature-modules/layout/home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { EquipmentComponent } from 'src/app/feature-modules/administration/equipment/equipment.component';
import { UserComponent } from 'src/app/feature-modules/administration/users/user.component';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { TouristEquipmentComponent } from 'src/app/feature-modules/tourist/tourist-equipment/tourist-equipment.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from 'src/app/feature-modules/administration/profile/profile.component';
import { TourComponent } from 'src/app/feature-modules/tour-authoring/tour/tour.component';
import { ClubInvitationComponent } from '../../feature-modules/tourist/club-invitation/club-invitation.component';
import { ObjectComponent } from 'src/app/feature-modules/tour-authoring/object/object.component';
import { ToursTestModuleComponent } from 'src/app/feature-modules/tour-authoring/tours-test-module/tours-test-module.component';
import { ToursPreviewComponent } from 'src/app/feature-modules/tour-authoring/tours-preview/tours-preview.component';
import { ClubJoinRequestsComponent } from 'src/app/feature-modules/tourist/club-join-requests/club-join-requests.component';
import { TourReviewComponent } from 'src/app/feature-modules/tour-execution/tour-review/tour-review.component';
import { ClubsComponent } from 'src/app/feature-modules/tourist/clubs/clubs.component';
import { TourPreferenceComponent } from 'src/app/feature-modules/marketplace/tour-preference/tour-preference.component';
import { AppRatingComponent } from 'src/app/feature-modules/administration/app-rating/app-rating.component';
import { AppRatingFormAuthorComponent } from 'src/app/feature-modules/administration/app-rating-form-author/app-rating-form-author.component';
import { AppRatingTouristComponent } from 'src/app/feature-modules/administration/app-rating-tourist/app-rating-tourist.component';
import { AppRatingAuthorComponent } from 'src/app/feature-modules/administration/app-rating-author/app-rating-author.component';
import { AppRatingFormTouristComponent } from 'src/app/feature-modules/administration/app-rating-form-tourist/app-rating-form-tourist.component';
import { TourFormComponent } from 'src/app/feature-modules/tour-authoring/tour-form/tour-form.component';
import { TouristPositionComponent } from 'src/app/feature-modules/tour-execution/tourist-position/tourist-position.component';
import { ToursOverviewComponent } from 'src/app/feature-modules/marketplace/tours-overview/tours-overview.component';
import { TourIssueAdminComponent } from 'src/app/feature-modules/tour-execution/tour-issue-admin/tour-issue-admin.component';
import { TourIssueTouristComponent } from 'src/app/feature-modules/tour-execution/tour-issue-tourist/tour-issue-tourist.component';
import { TourIssueComponent } from 'src/app/feature-modules/tour-execution/tour-issue/tour-issue.component';
import { PublicEntityRequestsComponent } from 'src/app/feature-modules/administration/public-entity-requests/public-entity-requests.component';
import { ShoppingCartOverviewComponent } from 'src/app/feature-modules/marketplace/shopping-cart-overview/shopping-cart-overview.component'
import { CommentsDisplayComponent } from 'src/app/feature-modules/blog/comments-display/comments-display.component';
import { SingleBlogDisplayComponent } from 'src/app/feature-modules/blog/single-blog-display/single-blog-display.component';
import { ActiveTourComponent } from 'src/app/feature-modules/tour-execution/active-tour/active-tour.component';
import { BlogListDisplayComponent } from 'src/app/feature-modules/blog/blog-list-display/blog-list-display.component';
import { EncountersManagingComponent } from 'src/app/feature-modules/encounters-managing/encounters-managing/encounters-managing.component';
import { WalletComponent } from 'src/app/feature-modules/marketplace/wallet/wallet.component';
import { CustomTourFormComponent } from 'src/app/feature-modules/tourist/custom-tour-form/custom-tour-form.component';
import { EncountersTouristViewComponent } from 'src/app/feature-modules/encounters-managing/encounters-tourist-view/encounters-tourist-view.component';
import { CampaignTourFormComponent } from 'src/app/feature-modules/tourist/campaign-tour-form/campaign-tour-form.component';

const routes: Routes = [

  // S1

  // All
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], },

  // Tourist
  {path: 'touristSelectingEquipment', component: TouristEquipmentComponent, canActivate: [AuthGuard]},
  {path: 'clubs', component: ClubsComponent, canActivate: [AuthGuard]}, 
  {path: 'clubInvitations', component: ClubInvitationComponent, canActivate: [AuthGuard], },
  {path: 'clubJoinRequests', component: ClubJoinRequestsComponent, canActivate: [AuthGuard], },
  {path: 'tourPreference', component: TourPreferenceComponent, canActivate: [AuthGuard],},
  {path: 'admin/tourissues', component: TourIssueAdminComponent, canActivate: [AuthGuard]},
  {path: 'user/tourissues', component: TourIssueTouristComponent, canActivate: [AuthGuard]},
  {path: 'tourissue/:id', component: TourIssueComponent, canActivate: [AuthGuard]},
  {path: 'blog', component:BlogListDisplayComponent, canActivate: [AuthGuard]},
  {path: 'blog/:id', component:SingleBlogDisplayComponent, canActivate: [AuthGuard]},
  {path: 'tour-review', component: TourReviewComponent},
  {path: 'appRatingTouristForm', component: AppRatingFormTouristComponent, canActivate: [AuthGuard]},
  {path: 'appRatingTourist', component: AppRatingTouristComponent, canActivate: [AuthGuard]},
  {path: 'toursMarketplace', component: ToursOverviewComponent, canActivate: [AuthGuard]},
  {path: 'my-position', component: TouristPositionComponent, canActivate: [AuthGuard]},
  {path: 'shopping-cart-overview', component: ShoppingCartOverviewComponent, canActivate: [AuthGuard]},
  {path: 'comments', component:CommentsDisplayComponent},
  {path: 'active-tour', component: ActiveTourComponent, canActivate: [AuthGuard]},
  {path: 'purchased-tours', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'wallet', component: WalletComponent, canActivate: [AuthGuard]},
  {path: 'custom-tour/:id', component: CustomTourFormComponent, canActivate: [AuthGuard]},
  {path: 'encounters-map', component: EncountersTouristViewComponent, canActivate: [AuthGuard]},
  {path: 'campaign',component: CampaignTourFormComponent,canActivate: [AuthGuard]},

  // Admin
  { path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard], },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard], },
  { path: 'appRatingList', component: AppRatingComponent, canActivate: [AuthGuard] },
  { path: 'clubJoinRequests', component: ClubJoinRequestsComponent, canActivate: [AuthGuard], },
  { path: 'publicEntityRequests', component: PublicEntityRequestsComponent, canActivate: [AuthGuard] },
  { path: 'encountersManagement', component: EncountersManagingComponent, canActivate: [AuthGuard] },

  // Author
  //{path: 'appRatingAuthor', component: AppRatingFormAuthorComponent, canActivate: [AuthGuard]},
  { path: 'tours', component: TourComponent, canActivate: [AuthGuard] },
  { path: 'tours-equipment', component: ToursPreviewComponent, canActivate: [AuthGuard], },
  { path: 'objects', component: ObjectComponent, canActivate: [AuthGuard] },
  { path: 'appRatingAuthorForm', component: AppRatingFormAuthorComponent, canActivate: [AuthGuard] },
  { path: 'appRatingAuthor', component: AppRatingAuthorComponent, canActivate: [AuthGuard] },
  { path: 'tour-management/:id', component: TourFormComponent, canActivate: [AuthGuard] },

  // ?
  { path: 'tours/maptest', component: ToursTestModuleComponent, /*canActivate: [AuthGuard]*/ },

];


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [RouterModule.forRoot(routes), CommonModule, FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }