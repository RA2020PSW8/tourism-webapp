import { Rating } from "./rating.model";

export enum BlogStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    CLOSED = 'CLOSED'
}
export interface Blog {
    id? : number,
    title : string,
    description : string,
    creationDate : string,
    imageLinks : string[],
    systemStatus : BlogStatus,
    blogRatings?:Rating[]
}