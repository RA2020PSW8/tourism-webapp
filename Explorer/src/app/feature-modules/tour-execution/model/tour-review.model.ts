export interface TourReview {
    id?: number,
    rating: number,
    comment: string,
    visitDate: Date,
    ratingDate: Date,
    imageLinks: string[],
    tourId: number,
    userId: number
}