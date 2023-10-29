export enum TourDifficulty {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
    EXTREME = 'EXTREME'
}

export enum TransportType {
    WALK = 'WALK',
    BIKE = 'BIKE',
    CAR = 'CAR',
    BOAT = 'BOAT'
}

export enum Status {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED'
}

export interface Tour {
    id? : number,
    userId: number,
    name: string, 
    description: string,
    price: number,
    difficulty: TourDifficulty,
    transportType: TransportType,
    status: Status,
    tags?: []
}