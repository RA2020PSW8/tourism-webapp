export enum UserRole {
    Administrator = 'administrator',
    Author = 'author',
    Tourist = 'tourist',
  }
export interface User {
    id?: number;
    username: string;
    password: string;
    isActive: boolean;
    role: number;
    mail: string;
    isBlocked: boolean;
}
