import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SliderComponent } from '../slider/slider.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ArticlesComponent } from '../articles/articles.component';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-search',
  imports: [SliderComponent, SidebarComponent, ArticlesComponent],
  template: `
    <app-slider [title]="'Búsqueda: ' + searchString()" size="small" />

    <div class="center">
      <section id="content">
        <h2 class="subheader">Resultados para '{{ searchString() }}'</h2>
        <app-articles [articles]="articles()" [loading]="loading()" />
      </section>

      <app-sidebar />

      <div class="clearfix"></div>
    </div>
  `
})
export class SearchComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly articleService = inject(ArticleService);

  readonly searchString = signal<string>('');
  readonly articles = signal<Article[]>([]);
  readonly loading = signal<boolean>(true);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const term = params['search'] || '';
      this.searchString.set(term);
      this.loading.set(true);

      this.articleService.search(term).subscribe({
        next: (data) => {
          this.articles.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.articles.set([]);
          this.loading.set(false);
        }
      });
    });
  }
}
