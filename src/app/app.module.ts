import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet, provideRouter } from '@angular/router';
import { routes } from './app.routes';

//Material Components
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

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
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatIconModule,
    RouterOutlet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
