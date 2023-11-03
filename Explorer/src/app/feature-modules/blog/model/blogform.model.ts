import { BlogStatus } from "./blog.model";

export interface BlogString {
    id? : number,
    title : string,
    description : string,
    creationDate : string,
    imageLinks : string[],
    status : BlogStatus;
}