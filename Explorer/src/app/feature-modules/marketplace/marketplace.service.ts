import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TourPreference } from './model/tour-preference.model';
import { environment } from 'src/env/environment';
import { Observable } from 'rxjs';
import { PagedResult } from '../tour-execution/shared/model/paged-result.model';
import { Tour } from '../tour-authoring/model/tour.model';
import { OrderItem } from './model/order-item.model';
import { PagedResults } from '../../shared/model/paged-results.model';
import { ShoppingCart } from './model/shopping-cart.model';
import { Keypoint } from '../tour-authoring/model/keypoint.model';
import { Object } from '../tour-authoring/model/object.model';
import { TourReview } from '../tour-execution/model/tour-review.model';
import { TourPurchaseToken } from './model/tour-purchase-token.model';
import { Wallet } from './model/wallet.model';
import { Tourist } from './model/tourist-model';
import { Coupon } from './model/coupon-model';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  private readonly apiUrl = `${environment.apiHost}tourist`;
  private readonly tourApiUrl = `${environment.apiHost}marketplace/tours`;
  private readonly filterApiUrl = `${environment.apiHost}marketplace/tours/filter`
  private readonly tourReviewApiUrl = `${environment.apiHost}tourexecution/tourreview`;
  private readonly userApiUrl = `${environment.apiHost}administration/users`;
  private readonly couponApiUrl = `${environment.apiHost}marketplace/coupons`;


  constructor(private http: HttpClient) { }

  getTourPreference(): Observable<TourPreference> {
    return this.http.get<TourPreference>(`${this.apiUrl}/tourPreference`)
  }

  deleteTourPreference(): Observable<TourPreference> {
    return this.http.delete<TourPreference>(`${this.apiUrl}/tourPreference`);
  }

  addTourPreference(tourPreference: TourPreference): Observable<TourPreference> {
    return this.http.post<TourPreference>(`${this.apiUrl}/tourPreference`, tourPreference);
  }

  updateTourPreference(tourPreference: TourPreference): Observable<TourPreference> {
    return this.http.put<TourPreference>(`${this.apiUrl}/tourPreference`, tourPreference);
  }

  /* Tour */
  getPublishedTours(): Observable<PagedResult<Tour>> {
    return this.http.get<PagedResult<Tour>>(`${this.tourApiUrl}`);
  }

  getFilteredTours(page: number, pageSize: number, currentLatitude: number, currentLongitude: number, filterRadius: number): Observable<PagedResult<Tour>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('CurrentLatitude', currentLatitude.toString())
      .set('CurrentLongitude', currentLongitude.toString())
      .set('FilterRadius', filterRadius.toString());
    return this.http.get<PagedResult<Tour>>(`${this.filterApiUrl}`, { params })
  }

  getPublicObjects(page: number, pageSize: number, currentLatitude: number, currentLongitude: number, filterRadius: number): Observable<PagedResult<Object>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('CurrentLatitude', currentLatitude.toString())
      .set('CurrentLongitude', currentLongitude.toString())
      .set('FilterRadius', filterRadius.toString());
    return this.http.get<PagedResult<Object>>(environment.apiHost + 'tourist/object/filtered', { params });
  }

  getPublicKeyPoints(page: number, pageSize: number, currentLatitude: number, currentLongitude: number, filterRadius: number): Observable<PagedResult<Keypoint>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('CurrentLatitude', currentLatitude.toString())
      .set('CurrentLongitude', currentLongitude.toString())
      .set('FilterRadius', filterRadius.toString());
    return this.http.get<PagedResult<Keypoint>>(environment.apiHost + 'tourist/publicKeypoint/filtered', { params });
  }

  addOrderItem(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(environment.apiHost + 'tourist/orderItems', orderItem);
  }
  createWallet(wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(environment.apiHost + 'tourist/wallet', wallet);
  }
  getAllOrders(): Observable<PagedResult<OrderItem>> {
    return this.http.get<PagedResult<OrderItem>>(`${this.apiUrl}/orderItems`);
  }
  getAllWallets(): Observable<PagedResult<OrderItem>> {
    return this.http.get<PagedResult<OrderItem>>(`${this.apiUrl}/wallet`);
  }
  getOrdersForUser(): Observable<PagedResults<OrderItem>> {
    return this.http.get<PagedResults<OrderItem>>(environment.apiHost + 'tourist/orderItems/byUser');
  }
  updateShoppingCart(shoppingCart: ShoppingCart): Observable<ShoppingCart> {
    return this.http.put<ShoppingCart>(`${this.apiUrl}/shoppingCart`, shoppingCart);
  }
  getShoppingCartForUser(): Observable<ShoppingCart> {
    return this.http.get<ShoppingCart>(environment.apiHost + 'tourist/shoppingCart/byUser');
  }
  getWalletForUser(): Observable<Wallet> {
    return this.http.get<Wallet>(environment.apiHost + 'tourist/wallet/byUser');
  }
  deleteOrderItem(orderItemId: number): Observable<OrderItem> {
    return this.http.delete<OrderItem>(environment.apiHost + 'tourist/orderItems/' + orderItemId);

  }

  getArchivedAndPublishedTours(): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(`${this.tourApiUrl}/arhived-published`);
  }

  getReviewsByTour(tourId: number): Observable<PagedResults<TourReview>> {
    return this.http.get<PagedResults<TourReview>>(`${this.tourReviewApiUrl}/tour/${tourId}`);
  }

  buyShoppingCart(shoppingCartId: number): Observable<void> {
    return this.http.put<void>(this.tourApiUrl + '/token/' + shoppingCartId, null);
  }

  calculateAverageRate(tourReviews: TourReview[]): Observable<number> {
    return this.http.post<number>(this.tourReviewApiUrl + '/averageRate', tourReviews);
  }

  getPurchasedTours(): Observable<PagedResults<TourPurchaseToken>> {
    return this.http.get<PagedResults<TourPurchaseToken>>(`${this.tourApiUrl}/token`);
  }

  checkIfPurchased(tourId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.tourApiUrl}/token/check-purchase/${tourId}`);
  }

  getCustomTours(): Observable<PagedResult<Tour>> {
    return this.http.get<PagedResult<Tour>>(`${this.tourApiUrl}/custom`);
  }

  getAllTourists(): Observable<PagedResults<Tourist>> {
    return this.http.get<PagedResults<Tourist>>(`${this.userApiUrl}/allTourists`);
  }

  getAllToursForAuthor(authorId: number): Observable<PagedResults<Tour>> {
    return this.http.get<PagedResults<Tour>>(`${this.tourApiUrl}/allToursForAuthor/${authorId}`);
  }

  createCoupon(coupon: Coupon) : Observable<PagedResult<Coupon>>{
    return this.http.post<PagedResult<Coupon>>(`${this.couponApiUrl}`, coupon);
  }
  //getCouponsForUserIdTourId
  
}
