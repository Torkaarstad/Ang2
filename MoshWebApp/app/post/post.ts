import {Comment } from './comment';

export class Post {
    userId: number;
    id?: number;
    title: string;
    body: string;
    comments: Comment[];
}