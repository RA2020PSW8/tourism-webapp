export enum EncounterStatus {
    ACTIVE = "ACTIVE",
    DRAFT = "DRAFT",
    ARCHIVED = "ARCHIVED"
}

export enum EncounterType {
    SOCIAL = "SOCIAL",
    LOCATION = "LOCATION",
    MISC = "MISC"
}

export interface Encounter {
    id?: number,
    userId?: number,
    name: string,
    description: string,
    latitude: number,
    longitude: number,
    xp: number,
    status: EncounterStatus,
    type: EncounterType,
    range: number,
    image?: string,
    imageLatitude?: string,
    imageLongitude?: string,
    peopleCount? : number 
}