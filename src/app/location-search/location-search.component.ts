import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-location-search',
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css']
})
export class LocationSearchComponent {
  searchQuery: string = '';
  locations: any[] = [];
  errorMessage: string = '';

  searchQuery$ = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {
    this.searchQuery$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((query) => {
        this.fetchLocations(query);
      });
  }

  onSearchInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery$.next(query);
  }

  fetchLocations(query: string) {
    if (!query || query.trim() === '') {
      this.locations = [];
      this.errorMessage = '';
      return;
    }

    const url = `${environment.apiUrl}/find?q=${query}&appid=${environment.apiKey}&units=metric&lang=ru`;
    this.http.get(url).subscribe({
      next: (data: any) => {
        if (data && data.list) {
          this.locations = data.list;
        } else {
          this.errorMessage = 'Данные не найдены.';
        }
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMessage = 'Пожалуйста, введите название города.';
        } else {
          this.errorMessage = 'Не удалось загрузить данные. Пожалуйста, попробуйте позже.';
        }
        console.error('Ошибка при загрузке данных:', err);
      }
    });
  }

  selectLocation(location: any) {
    this.router.navigate(['/weather', location.id]);
  }
}
