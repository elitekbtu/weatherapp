import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { LocationSearchComponent } from './location-search/location-search.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'weather/:locationId', component: WeatherDetailsComponent },
  { path: 'search', component: LocationSearchComponent }
];
