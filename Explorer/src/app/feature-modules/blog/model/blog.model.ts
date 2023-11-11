import { BlogStatus } from "./blogstatus-model";

export enum BlogSystemStatus {
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
    systemStatus : BlogSystemStatus,
    blogStatuses?: BlogStatus[]
}