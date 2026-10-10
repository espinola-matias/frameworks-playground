import { Component, input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, SlicePipe } from '@angular/common';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-articles',
  imports: [RouterLink, DatePipe, SlicePipe],
  template: `
    <div id="articles">
      @if (loading()) {
        <div class="loading-box">
          <p>⏳ Cargando artículos desde el servidor...</p>
        </div>
      } @else if (articles().length === 0) {
        <div class="alert-box alert-danger">
          <p>⚠️ No hay artículos para mostrar en este momento.</p>
        </div>
      } @else {
        @for (article of articles(); track article._id) {
          <article class="article-item">
            <div class="image-wrap">
              <img [src]="articleService.getImageUrl(article.image)" [alt]="article.title" />
            </div>

            <h2>
              <a [routerLink]="['/articulo', article._id]">{{ article.title }}</a>
            </h2>
            
            <span class="date">
              📅 Publicado el {{ article.date | date: 'dd/MM/yyyy, HH:mm' }}
            </span>

            <p class="content-preview">
              {{ article.content.length > 180 ? (article.content | slice: 0: 180) + '...' : article.content }}
            </p>

            <a [routerLink]="['/articulo', article._id]" class="read-more">Leer más &rarr;</a>

            <div class="clearfix"></div>
          </article>
        }
      }
    </div>
  `
})
export class ArticlesComponent {
  readonly articles = input<Article[]>([]);
  readonly loading = input<boolean>(false);
  protected readonly articleService = inject(ArticleService);
}
