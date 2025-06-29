import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { authRedirectGuard } from './shared/guards/auth-redirect.guard';

export const routes: Routes = [
  {
    path: 'register',
    canActivate: [authRedirectGuard],
    component: RegisterComponent
  },
  {
    path: 'login',
    canActivate: [authRedirectGuard],
    component: LoginComponent
  },
  {
    path: '',
    loadComponent: () =>
        import('./layout/layout/layout.component').then(m => m.LayoutComponent),
         loadChildren: () => import('./layout/route').then(m => m.routes)
  },
  {
    path: '**',
    redirectTo: '',
  }

    
];
