export type Customer = {
    id: number,
    first_Name: string,
    last_Name: string,
    email: string,
    active: string,
    streetAddress: string,
    streetAddress2?: string | null,
    city: string,
    country: string,
    zipcode?: string | null,
    created: string
};

export type CustomerSummary = {
    id: number,
    customerName: string,
    moviesNotReturned: number,
    moviesRentedTotal: number,
    totalSpent: number,
    mostViewedCategory: string
};