import { Rental } from "../models/rental";

export type RentalsResponse = {
    currentPage: number,
    total: number,
    rentals: Rental[]
};