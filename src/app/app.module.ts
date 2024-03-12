import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { RentalsComponent } from './pages/rentals/rentals.component';
import { FilmsComponent } from './pages/films/films.component';
import { SidebarContentComponent } from './layout/sidebar-content/sidebar-content.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FilmComponent } from './components/film/film.component';
import { RentalComponent } from './components/rental/rental.component';
import { FiltersBarComponent } from './components/search-filters-bar/search-filters-bar.component';
import { MaterialModule } from './modules/material.module';
import { FormsModule } from '@angular/forms';
import { HorizontalBargraphComponent } from './components/horizontal-bargraph/horizontal-bargraph.component';
import { PiegraphComponent } from './components/piegraph/piegraph.component';
import { VerticalBargraphComponent } from './components/vertical-bargraph/vertical-bargraph.component';
import { LinechartComponent } from './components/linechart/linechart.component';
import { CustomerViewModalComponent } from './pages/customers/customer-view-modal/customer-view-modal.component';
import { ReadonlyInputComponent } from './components/readonly-input/readonly-input.component';
import { ReadonlyCheckboxComponent } from './components/readonly-checkbox/readonly-checkbox.component';
import { FilmViewModalComponent } from './pages/films/film-view-modal/film-view-modal.component';
import { SnackbarAlertComponent } from './components/snackbar-alert/snackbar-alert.component';
import { RentalViewModalComponent } from './pages/rentals/rental-view-modal/rental-view-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    CustomersComponent,
    RentalsComponent,
    FilmsComponent,
    SidebarContentComponent,
    CustomerComponent,
    PaginatorComponent,
    SpinnerComponent,
    FilmComponent,
    RentalComponent,
    FiltersBarComponent,
    HorizontalBargraphComponent,
    PiegraphComponent,
    VerticalBargraphComponent,
    LinechartComponent,
    CustomerViewModalComponent,
    ReadonlyInputComponent,
    ReadonlyCheckboxComponent,
    FilmViewModalComponent,
    SnackbarAlertComponent,
    RentalViewModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterOutlet,
    FormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
