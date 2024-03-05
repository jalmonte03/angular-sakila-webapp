export type Rental = {
    id: number,
    customerId: number,
    inventoryId: number,
    filmId: number,
    customerName: string,
    filmTitle: string,
    filmReleaseYear: string,
    filmRentalDuration: number,
    filmRentalRate: number,
    rentalDate: string,
    returnDate: string
};

export type RentalMonthSummary = {
    month: string,
    year: string,
    amount: number
};

export type RentalMonthRevenue = {
    month: string,
    year: string,
    revenue: number
};