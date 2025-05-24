import { Component, isDevMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { akitaDevtools } from '@datorama/akita';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor() {
    if (isDevMode()) {
      akitaDevtools();
    }
  }
}
