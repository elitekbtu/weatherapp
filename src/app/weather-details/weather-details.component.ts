import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../services/weather.service';

@Component({
  standalone: true,
  selector: 'app-weather-details',
  imports: [CommonModule],
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent {
  weather: any;
  isLoading = true;
  errorMessage: string = '';

  weatherTranslations: { [key: string]: string } = {
    'clear sky': 'Ясно',
    'few clouds': 'Малооблачно',
    'scattered clouds': 'Рассеянные облака',
    'broken clouds': 'Облачно',
    'shower rain': 'Ливень',
    'rain': 'Дождь',
    'thunderstorm': 'Гроза',
    'snow': 'Снег',
    'mist': 'Туман',
    'облачно с прояснениями': 'Облачно с прояснениями'
  };

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) {
    const locationId = this.route.snapshot.paramMap.get('locationId');
    if (locationId) {
      this.fetchWeatherData(locationId);
    } else {
      this.errorMessage = 'ID местоположения отсутствует.';
      this.isLoading = false;
    }
  }

  fetchWeatherData(locationId: string) {
    this.weatherService.getWeatherByCityId(locationId).subscribe({
      next: (data: any) => {
        this.weather = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Ошибка:', error);
        this.errorMessage = 'Не удалось загрузить данные о погоде. Пожалуйста, попробуйте позже.';
        this.isLoading = false;
      }
    });
  }

  translateWeather(description: string): string {
    return this.weatherTranslations[description] || description;
  }
}
