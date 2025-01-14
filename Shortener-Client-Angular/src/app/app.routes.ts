import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyLinksComponent } from './pages/my-links/my-links.component';
import { AddLinkComponent } from './pages/add-link/add-link.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { authGuard } from './guard/auth.guard';
import { adminGuard } from './guard/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'shortened/:hashUrl',
    component: RedirectComponent,
  },
  {
    path: 'add-link',
    component: AddLinkComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-links',
    component: MyLinksComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [adminGuard],
  },
];
