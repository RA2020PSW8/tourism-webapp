export interface Comment{
    id? : number,
    forumId : number,
    username: string,
    comment: string,
    postTime: Date,
    lastEditTime? : Date,
    isDeleted: boolean
}