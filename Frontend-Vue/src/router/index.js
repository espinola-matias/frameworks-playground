import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Blog from '../views/Blog.vue';
import Formulario from '../views/Formulario.vue';
import ArticleDetail from '../views/ArticleDetail.vue';
import ArticleForm from '../views/ArticleForm.vue';
import Search from '../views/Search.vue';
import Error404 from '../views/Error404.vue';

const routes = [
  { path: '', redirect: '/inicio' },
  { path: '/inicio', name: 'Home', component: Home },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/formulario', name: 'Formulario', component: Formulario },
  { path: '/articulo/:id', name: 'ArticleDetail', component: ArticleDetail },
  { path: '/crear-articulo', name: 'CreateArticle', component: ArticleForm },
  { path: '/editar-articulo/:id', name: 'EditArticle', component: ArticleForm },
  { path: '/buscar/:search', name: 'Search', component: Search },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: Error404 }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
});

export default router;
