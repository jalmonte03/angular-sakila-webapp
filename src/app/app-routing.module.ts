import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CustomersComponent } from "./pages/customers/customers.component";
import { RentalsComponent } from "./pages/rentals/rentals.component";
import { FilmsComponent } from "./pages/films/films.component";

const routes: Routes = [{
  path: '',
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
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
