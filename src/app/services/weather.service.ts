import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherByCityId(cityId: string): Observable<any> {
    const url = `${environment.apiUrl}/weather?id=${cityId}&appid=${environment.apiKey}&units=metric&lang=ru`;
    return this.http.get(url);
  }
}
