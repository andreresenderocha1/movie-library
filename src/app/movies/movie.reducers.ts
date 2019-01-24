import * as MovieActions from './movie.actions';

import {Action} from '@ngrx/store'
import { Movie } from './movie.model';

const initialState = {
    movies: [
        new Movie(1,'Avatar','Some comments here', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Avatar-Teaser-Poster.jpg/220px-Avatar-Teaser-Poster.jpg'),
        new Movie(2,"Tubarão", 'Some comments here','https://i.pinimg.com/originals/83/60/2d/83602d0529db152b406f35626048beff.jpg')
    ]
}

export function movieReducer(state = initialState, action: MovieActions.MovieActions){
    switch(action.type){
        case 'ADD_MOVIE':
            return{
                ...state,
                movies: [...state.movies, action.payload]
            }
        default: 
            return state;
    }
}