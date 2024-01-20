import { Customer } from "../models/customer"

export type CustomersResponse = {
    currentPage: number,
    total: number,
    customers: Customer[]
};