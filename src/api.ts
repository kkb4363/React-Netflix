
const API_KEY = '505148347d18c10aeac2faa958dbbf5c';
const BASE_PATH = 'https://api.themoviedb.org/3';

interface IMovie{
    id:number;
    backdrop_path: string;
    poster_path:string;
    title:string;
    overview:string;
    vote_count:number;
    release_date:string;
}

interface ITV{
    id:number;
    overview:string;
    backdrop_path:string;
    name:string;
    vote_count:number;
    first_air_date:string;
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

export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
    .then((response) => response.json()
    );
}

export function getPopularMovies(){
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`)
    .then((response) => response.json()
    );
}

export function getPopularTv(){
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`)
    .then((response) => response.json());
}

export function getAiringTv(){
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`)
    .then((response)=> response.json());
}