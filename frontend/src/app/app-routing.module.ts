import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/pages/search/search.component';
import { WatchlistComponent } from './components/pages/watchlist/watchlist.component';
import { PortfolioComponent } from './components/pages/portfolio/portfolio.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'search/home', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  {path: 'search/home', component: HomeComponent},
  {path: 'search/:ticker', component: SearchComponent},
  {path: 'watchlist', component: WatchlistComponent},
  {path: 'portfolio', component: PortfolioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
