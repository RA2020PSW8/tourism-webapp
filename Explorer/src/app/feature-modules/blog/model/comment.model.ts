export interface Comment{
    id? : number,
    blogId? : number,
    username?: string,
    comment: string,
    postTime: Date,
    lastEditTime? : Date,
    isDeleted: boolean
}