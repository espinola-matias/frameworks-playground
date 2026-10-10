import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule, SidebarComponent],
  template: `
    <div class="center" style="margin-top: 30px;">
      <section id="content">
        <h1 class="subheader">Formulario de Contacto</h1>

        <form class="mid-form" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" id="nombre" [(ngModel)]="user.nombre" placeholder="Tu nombre..." required />
          </div>

          <div class="form-group">
            <label for="apellidos">Apellidos</label>
            <input type="text" name="apellidos" id="apellidos" [(ngModel)]="user.apellidos" placeholder="Tus apellidos..." required />
          </div>

          <div class="form-group">
            <label for="bio">Biografía</label>
            <textarea name="bio" id="bio" [(ngModel)]="user.bio" placeholder="Cuéntanos sobre ti..."></textarea>
          </div>

          <div class="form-group" style="text-align: left; margin: 15px 0;">
            <label style="display: block; margin-bottom: 8px;">Género</label>
            <label style="margin-right: 15px; font-weight: normal; cursor: pointer;">
              <input type="radio" name="genero" value="hombre" [(ngModel)]="user.genero" /> Hombre
            </label>
            <label style="margin-right: 15px; font-weight: normal; cursor: pointer;">
              <input type="radio" name="genero" value="mujer" [(ngModel)]="user.genero" /> Mujer
            </label>
            <label style="font-weight: normal; cursor: pointer;">
              <input type="radio" name="genero" value="otro" [(ngModel)]="user.genero" /> Otro
            </label>
          </div>

          <div class="clearfix"></div>

          <input type="submit" value="Enviar Formulario" class="btn btn-success" />
        </form>

        @if (submitted) {
          <div class="alert-box alert-success" style="margin-top: 30px;">
            <h3>✅ Datos recibidos del formulario:</h3>
            <p><strong>Nombre completo:</strong> {{ user.nombre }} {{ user.apellidos }}</p>
            <p><strong>Biografía:</strong> {{ user.bio || 'Sin biografía' }}</p>
            <p><strong>Género:</strong> {{ user.genero }}</p>
          </div>
        }
      </section>

      <app-sidebar />

      <div class="clearfix"></div>
    </div>
  `
})
export class FormularioComponent {
  user = {
    nombre: '',
    apellidos: '',
    bio: '',
    genero: 'hombre'
  };

  submitted: boolean = false;

  onSubmit(): void {
    if (this.user.nombre && this.user.apellidos) {
      this.submitted = true;
    }
  }
}
