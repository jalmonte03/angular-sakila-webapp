import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CustomersComponent } from "./pages/customers/customers.component";
import { RentalsComponent } from "./pages/rentals/rentals.component";
import { FilmsComponent } from "./pages/films/films.component";

export const routes: Routes = [
    {
        path: '/',
        component: DashboardComponent
    },
    {
        path: 'customers',
        component: CustomersComponent
    },
    {
        path: 'rentals',
        component: RentalsComponent
    },
    {
        path: 'films',
        component: FilmsComponent
    }
];