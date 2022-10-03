import { useLocation, useNavigate, PathMatch, useMatch } from "react-router-dom";
const API_KEY = '505148347d18c10aeac2faa958dbbf5c';
const BASE_PATH = 'https://api.themoviedb.org/3';

interface MGen{
    id:number;
    name:string;
}

interface TGen{
    id:number;
    name:string;
}

interface IMovie{
    id:number;
    backdrop_path: string;
    poster_path:string;
    title:string;
    overview:string;
    vote_count:number;
    release_date:string;
    genre_ids:[];
    vote_average:number;
}

interface ITV{
    id:number;
    overview:string;
    backdrop_path:string;
    name:string;
    vote_count:number;
    first_air_date:string;
    genre_ids:[];
    vote_average:number;
}

interface ISearch{
    id:number;
    poster_path:string;
    title:string;
    backdrop_path:string;
    overview:string;
    release_date:string;
    vote_count:number;
    vote_average:number;
}

export interface IGetMoviesResult {
    dates:{
        maximum: string;
        minimum: string;
    };
    page: number,
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export interface IGetTvResult {
    page:number,
    results:ITV[];
    total_results:number;
    total_pages:number;
}

export interface IGetSearch{
    page:number,
    results:ISearch[];
    total_pages:number,
    total_results:number,
}

export interface IMovieGenres{
    genres:MGen[];
}

export interface ITVGenres{
    genres:MGen[];
}

export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`)
    .then((response) => response.json()
    );
}
export function getPopularMovies(){
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR`)
    .then((response) => response.json()
    );
}
export function getMgenres(){
    return fetch(`${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=ko-KR`)
    .then((response) => response.json());
}
export function getTVgenres(){
    return fetch(`${BASE_PATH}/genre/tv/list?api_key=${API_KEY}&language=ko-KR`)
    .then((response) => response.json());
}


export function getPopularTv(){
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR`)
    .then((response) => response.json());
}
export function getAiringTv(){
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko-KR`)
    .then((response)=> response.json());
}
