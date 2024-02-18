import { Film } from "../models/film";

export type FilmsResponse = {
    currentPage: number,
    total: number,
    films: Film[]
};