<<<<<<< HEAD
import { Rating } from "./rating.model";

export enum BlogStatus {
=======
import { BlogStatus } from "./blogstatus-model";

export enum BlogSystemStatus {
>>>>>>> 991b061 (feat: implemented filtering by status)
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
    systemStatus : BlogSystemStatus,
    blogStatuses?: BlogStatus[]
>>>>>>> 991b061 (feat: implemented filtering by status)
}