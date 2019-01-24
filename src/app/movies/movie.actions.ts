import { Action } from '@ngrx/store';
import { Movie } from './movie.model';

export class AddMovie implements Action{
    readonly type = 'ADD_MOVIE';
    constructor(public payload: Movie){}
}

export type MovieActions = AddMovie