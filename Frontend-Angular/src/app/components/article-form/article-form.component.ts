import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-form',
  imports: [FormsModule, SidebarComponent],
  template: `
    <div class="center" style="margin-top: 30px;">
      <section id="content">
        <h1 class="subheader">{{ isEdit() ? 'Editar artículo' : 'Crear artículo' }}</h1>

        @if (statusMessage()) {
          <div class="alert-box" [class.alert-success]="isSuccess()" [class.alert-danger]="!isSuccess()">
            {{ statusMessage() }}
          </div>
        }

        <form class="mid-form" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="title">Título del artículo</label>
            <input
              type="text"
              name="title"
              id="title"
              [(ngModel)]="article.title"
              placeholder="Ingresa un título descriptivo..."
              required
              minlength="3"
            />
          </div>

          <div class="form-group">
            <label for="content">Contenido</label>
            <textarea
              name="content"
              id="content"
              [(ngModel)]="article.content"
              placeholder="Escribe el contenido completo del artículo..."
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label for="file0">Imagen (Opcional)</label>
            <input type="file" id="file0" (change)="onFileSelected($event)" accept="image/*" />
            
            @if (isEdit() && currentImage()) {
              <div style="margin-top: 10px;">
                <p style="margin: 0 0 5px 0; font-size: 13px; color: #666;">Imagen actual:</p>
                <img
                  [src]="articleService.getImageUrl(currentImage())"
                  alt="Imagen actual"
                  style="width: 120px; height: 80px; object-fit: cover; border-radius: 4px; border: 1px solid #ccc;"
                />
              </div>
            }
          </div>

          <div class="clearfix"></div>

          <div style="margin-top: 20px;">
            <button type="submit" class="btn btn-success" [disabled]="submitting()">
              {{ submitting() ? 'Guardando...' : (isEdit() ? 'Actualizar artículo' : 'Publicar artículo') }}
            </button>
          </div>
        </form>
      </section>

      <app-sidebar />

      <div class="clearfix"></div>
    </div>
  `
})
export class ArticleFormComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly articleService = inject(ArticleService);

  readonly isEdit = signal<boolean>(false);
  readonly submitting = signal<boolean>(false);
  readonly statusMessage = signal<string | null>(null);
  readonly isSuccess = signal<boolean>(true);
  readonly currentImage = signal<string | null>(null);

  articleId: string | null = null;
  selectedFile: File | null = null;

  article: Pick<Article, 'title' | 'content'> = {
    title: '',
    content: ''
  };

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('id');
    if (this.articleId) {
      this.isEdit.set(true);
      this.articleService.getArticle(this.articleId).subscribe({
        next: (data) => {
          this.article.title = data.title;
          this.article.content = data.content;
          this.currentImage.set(data.image || null);
        },
        error: () => {
          this.statusMessage.set('No se pudo cargar el artículo para editar');
          this.isSuccess.set(false);
        }
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (!this.article.title.trim() || !this.article.content.trim()) {
      this.statusMessage.set('Por favor completa todos los campos requeridos');
      this.isSuccess.set(false);
      return;
    }

    this.submitting.set(true);
    this.statusMessage.set(null);

    if (this.isEdit() && this.articleId) {
      // Actualización
      this.articleService.update(this.articleId, this.article).subscribe({
        next: (updatedArticle) => {
          if (this.selectedFile && updatedArticle._id) {
            this.articleService.uploadImage(this.selectedFile, updatedArticle._id).subscribe({
              next: () => this.handleSuccess(updatedArticle._id!),
              error: () => this.handleSuccess(updatedArticle._id!, 'Artículo actualizado, pero hubo un error al subir la imagen')
            });
          } else {
            this.handleSuccess(updatedArticle._id!);
          }
        },
        error: () => {
          this.submitting.set(false);
          this.statusMessage.set('Error al actualizar el artículo');
          this.isSuccess.set(false);
        }
      });
    } else {
      // Creación
      this.articleService.create(this.article).subscribe({
        next: (newArticle) => {
          if (this.selectedFile && newArticle._id) {
            this.articleService.uploadImage(this.selectedFile, newArticle._id).subscribe({
              next: () => this.handleSuccess(newArticle._id!),
              error: () => this.handleSuccess(newArticle._id!, 'Artículo creado, pero hubo un error al subir la imagen')
            });
          } else {
            this.handleSuccess(newArticle._id!);
          }
        },
        error: () => {
          this.submitting.set(false);
          this.statusMessage.set('Error al guardar el artículo');
          this.isSuccess.set(false);
        }
      });
    }
  }

  private handleSuccess(articleId: string, customMessage?: string): void {
    this.submitting.set(false);
    this.isSuccess.set(true);
    this.statusMessage.set(customMessage || (this.isEdit() ? 'Artículo actualizado correctamente' : 'Artículo creado correctamente'));
    
    setTimeout(() => {
      this.router.navigate(['/articulo', articleId]);
    }, 1200);
  }
}
