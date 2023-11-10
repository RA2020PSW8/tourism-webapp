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
<<<<<<< HEAD
    systemStatus : BlogStatus,
    blogRatings?:Rating[]
=======
    systemStatus : BlogStatus;
>>>>>>> 0b2a354 (fix: removed redundant BlogString class)
}