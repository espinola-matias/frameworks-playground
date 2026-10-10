import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-detail',
  imports: [RouterLink, DatePipe, SidebarComponent],
  template: `
    <div class="center" style="margin-top: 30px;">
      <section id="content">
        @if (loading()) {
          <div class="loading-box">
            <p>⏳ Cargando detalle del artículo...</p>
          </div>
        } @else if (!article()) {
          <div class="alert-box alert-danger">
            <p>❌ El artículo solicitado no existe o ha sido eliminado.</p>
            <a routerLink="/blog" class="btn">Volver al blog</a>
          </div>
        } @else {
          <article class="article-item article-detail">
            <div class="image-wrap">
              <img [src]="articleService.getImageUrl(article()?.image)" [alt]="article()?.title" />
            </div>

            <h1 class="subheader">{{ article()?.title }}</h1>
            <span class="date">📅 Publicado el {{ article()?.date | date: 'dd/MM/yyyy, HH:mm' }}</span>

            <p style="white-space: pre-line;">{{ article()?.content }}</p>

            <div class="article-actions">
              <a [routerLink]="['/editar-articulo', article()?._id]" class="btn btn-warning">✏️ Editar</a>
              <button (click)="deleteArticle()" class="btn btn-danger">🗑️ Eliminar</button>
              <a routerLink="/blog" class="btn">Volver al blog</a>
            </div>

            <div class="clearfix"></div>
          </article>
        }
      </section>

      <app-sidebar />

      <div class="clearfix"></div>
    </div>
  `
})
export class ArticleDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly articleService = inject(ArticleService);

  readonly article = signal<Article | null>(null);
  readonly loading = signal<boolean>(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleService.getArticle(id).subscribe({
        next: (data) => {
          this.article.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.article.set(null);
          this.loading.set(false);
        }
      });
    } else {
      this.loading.set(false);
    }
  }

  deleteArticle(): void {
    const current = this.article();
    if (!current || !current._id) return;

    const confirmed = confirm(`¿Estás seguro de que deseas eliminar el artículo "${current.title}"?`);
    if (confirmed) {
      this.articleService.delete(current._id).subscribe({
        next: () => {
          alert('Artículo eliminado correctamente');
          this.router.navigate(['/blog']);
        },
        error: (err) => {
          console.error(err);
          alert('Hubo un error al intentar eliminar el artículo');
        }
      });
    }
  }
}
