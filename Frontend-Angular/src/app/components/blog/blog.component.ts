import { Component, OnInit, signal, inject } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ArticlesComponent } from '../articles/articles.component';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-blog',
  imports: [SliderComponent, SidebarComponent, ArticlesComponent],
  template: `
    <app-slider title="Blog" size="small" />

    <div class="center">
      <section id="content">
        <h2 class="subheader">Todos los artículos</h2>
        <app-articles [articles]="articles()" [loading]="loading()" />
      </section>

      <app-sidebar />

      <div class="clearfix"></div>
    </div>
  `
})
export class BlogComponent implements OnInit {
  private readonly articleService = inject(ArticleService);

  readonly articles = signal<Article[]>([]);
  readonly loading = signal<boolean>(true);

  ngOnInit(): void {
    this.articleService.getArticles(false).subscribe({
      next: (data) => {
        this.articles.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.articles.set([]);
        this.loading.set(false);
      }
    });
  }
}
