import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [RouterLink],
  template: `
    <div class="center" style="margin-top: 60px; min-height: 500px;">
      <h1 class="subheader" style="color: #f13e3e; font-size: 48px;">404</h1>
      <h2>Página no encontrada</h2>
      <p style="font-size: 18px; color: #666; margin: 20px 0;">
        La página que estás buscando no existe o ha cambiado de lugar.
      </p>
      <a routerLink="/inicio" class="btn btn-success" style="margin: 0 auto;">Volver al inicio</a>
    </div>
  `
})
export class ErrorComponent {}
