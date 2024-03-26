import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistPageComponent } from './components/pages/watchlist-page/watchlist-page.component';
import { PortfolioPageComponent } from './components/pages/portfolio-page/portfolio-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { SearchPageComponent } from './components/pages/search-page/search-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'search/home', pathMatch: 'full'},
  // {path: '', component: SearchPageComponent},
  // {path: 'search/home', component: HomePageComponent},
  {path: 'search/:ticker', component: SearchPageComponent},
  {path: 'watchlist', component: WatchlistPageComponent},
  {path: 'portfolio', component: PortfolioPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
