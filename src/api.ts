import ApexCharts from "apexcharts";

const API_KEY = '505148347d18c10aeac2faa958dbbf5c';
const BASE_PATH = 'https://api.themoviedb.org/3';

interface IMovie{
    id:number;
    backdrop_path: string;
    poster_path:string;
    title:string;
    overview:string;
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