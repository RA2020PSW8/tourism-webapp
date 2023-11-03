export interface Keypoint {
    id?: number,
    tourId?: number,
    name: string,
    latitude: number,
    longitude: number,
    description?: string,
    image?: string
    position? : number
}