export enum Category {
    RESTAURANT = 'RESTAURANT',
    PARKING = 'PARKING',
    WC = 'WC',
    OTHER = 'OTHER'
}

export interface Object {
        id? : number,
        name: string,
        description: string, 
        image?: string,
        category: Category
}