import { TourIssueComment } from "./tour-issue-comment.model";

export interface TourIssue {
    id?: number,
    category: string,
    priority: number,
    description: string,
    creationDateTime: Date,
    resolveDateTime?: Date,
    isResolved?: boolean,
    tourId: number,
    comments?: TourIssueComment[],
    userId: number,
}