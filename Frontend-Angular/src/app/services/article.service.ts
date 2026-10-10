import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article, ApiResponse } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly http = inject(HttpClient);
  public readonly apiUrl = environment.apiUrl;

  // Obtener artículos (todos o últimos 5)
  getArticles(last: boolean = false): Observable<Article[]> {
    const url = last ? `${this.apiUrl}/articles/5` : `${this.apiUrl}/articles`;
    return this.http.get<ApiResponse<Article>>(url).pipe(
      map(res => res.articles || [])
    );
  }

  // Obtener artículo por ID
  getArticle(id: string): Observable<Article> {
    return this.http.get<ApiResponse<Article>>(`${this.apiUrl}/article/${id}`).pipe(
      map(res => {
        if (!res.article) {
          throw new Error('Artículo no encontrado');
        }
        return res.article;
      })
    );
  }

  // Buscar artículos
  search(searchString: string): Observable<Article[]> {
    return this.http.get<ApiResponse<Article>>(`${this.apiUrl}/search/${encodeURIComponent(searchString)}`).pipe(
      map(res => res.articles || [])
    );
  }

  // Crear artículo
  create(article: Pick<Article, 'title' | 'content'>): Observable<Article> {
    return this.http.post<ApiResponse<Article>>(`${this.apiUrl}/save`, article).pipe(
      map(res => {
        if (!res.article) {
          throw new Error('Error al crear el artículo');
        }
        return res.article;
      })
    );
  }

  // Actualizar artículo
  update(id: string, article: Pick<Article, 'title' | 'content'>): Observable<Article> {
    return this.http.put<ApiResponse<Article>>(`${this.apiUrl}/article/${id}`, article).pipe(
      map(res => {
        if (!res.article) {
          throw new Error('Error al actualizar el artículo');
        }
        return res.article;
      })
    );
  }

  // Eliminar artículo
  delete(id: string): Observable<Article> {
    return this.http.delete<ApiResponse<Article>>(`${this.apiUrl}/article/${id}`).pipe(
      map(res => {
        if (!res.article) {
          throw new Error('Error al eliminar el artículo');
        }
        return res.article;
      })
    );
  }

  // Subir imagen asociada a un artículo
  uploadImage(file: File, articleId: string): Observable<any> {
    const formData = new FormData();
    formData.append('file0', file, file.name);
    return this.http.post<ApiResponse<Article>>(`${this.apiUrl}/upload-image/${articleId}`, formData);
  }

  // Obtener URL de la imagen del artículo
  getImageUrl(imageName: string | null | undefined): string {
    if (!imageName) {
      return 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80';
    }
    return `${this.apiUrl}/get-image/${imageName}`;
  }
}
