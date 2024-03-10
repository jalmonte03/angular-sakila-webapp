export type Film = {
    id: number,
    title: string,
    description: string,
    releaseYear: string,
    rentalDuration: number,
    rentalRate: number,
    length: number,
    rating: string,
    lastUpdate: Date,
    categories: Array<{
        id: number,
        name: string
    }>
};

export type FilmWatched = {
   filmId: number,
   filmTitle: string,
   rented: number 
};

export type FilmSummary = {
    rented: number,
    notReturned: number,
    grossIncome: number,
    inStock: number
};