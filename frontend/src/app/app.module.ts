import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './components/pages/search/search.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SearchBarComponent } from './components/partials/search-bar/search-bar.component';
import { WatchlistComponent } from './components/pages/watchlist/watchlist.component';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { HomeComponent } from './components/pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    SearchBarComponent,
    WatchlistComponent,
    PortfolioComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatTabsModule,
    MatIconModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
