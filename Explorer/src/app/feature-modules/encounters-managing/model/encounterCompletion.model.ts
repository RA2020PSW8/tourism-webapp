import { Encounter } from "./encounter.model";

export enum EncounterCompletionStatus {
    STARTED = "STARTED",
    FAILED = "FAILED",
    COMPLETED = "COMPLETED"
}

export interface EncounterCompletion {
    id?: number,
    userId?: number,
    completionTime: Date,
    encounter: Encounter,
    xp: number,
    status: EncounterCompletionStatus
}