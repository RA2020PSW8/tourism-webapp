import {TourSale} from "./tour-sale.model";

export interface Sale{
  id?: number;
  startDate: string;
  endDate: string;
  percentage: number;
  userId: number,
  tourSales?: TourSale[]
}
