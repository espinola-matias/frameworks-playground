import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, FormsModule],
  template: `
    <aside id="sidebar">
      <div id="nav-blog" class="sidebar-item">
        <h3>Puedes hacer esto</h3>
        <a routerLink="/crear-articulo" class="btn btn-success">Crear artículo</a>
      </div>

      <div id="search" class="sidebar-item">
        <h3>Buscador</h3>
        <p>Encuentra el artículo que buscas</p>
        <form (ngSubmit)="onSearch()">
          <input type="text" name="search" [(ngModel)]="searchString" placeholder="Escribe para buscar..." required />
          <input type="submit" value="Buscar" class="btn" />
        </form>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  private readonly router = inject(Router);
  searchString: string = '';

  onSearch(): void {
    if (this.searchString.trim()) {
      this.router.navigate(['/buscar', this.searchString.trim()]);
      this.searchString = '';
    }
  }
}
