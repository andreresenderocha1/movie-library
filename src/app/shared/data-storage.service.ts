import { HttpClient } from '@angular/common/http';
import { Movie } from '../movies/movie.model';
import { Injectable } from '@angular/core';

@Injectable()
export class DataStorageService{
    constructor(private httpClient:HttpClient){}

    setMovies(){
        // const movies: Movie[] = [
        //     new Movie('Noviça','Mais ou menos'),
        //     new Movie('Avatar','Muito bom'),
        //     new Movie('Tubarao','Muito ruim')
                      
        // ];
        // return this.httpClient.put('https://movies-base.firebaseio.com/movies.json',movies);
    }

    getMovies(){
        return this.httpClient.get<Movie[]>('https://movies-base.firebaseio.com/movies.json');
            
    }
}