export interface TourPreference {
    id?: number;
    userId: number;
    difficulty: number;
    transportType: number;
    tags: string[];
}