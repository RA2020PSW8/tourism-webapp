export enum Category {
    RESTAURANT = 'RESTAURANT',
    PARKING = 'PARKING',
    WC = 'WC',
    OTHER = 'OTHER'
}

export enum Status {
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC'
}

export interface Object {
        id? : number,
        name: string,
        description: string, 
        image?: string,
        category: Category,
        status: number
}