// auth-redirect.guard.ts - Guard para evitar acceso a login/register si ya está autenticado
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/auth';

export const authRedirectGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Si el usuario está autenticado, redirigir al dashboard
  if (auth.isAuthenticated()) {
    console.log('Usuario ya autenticado, redirigiendo al dashboard...');
    router.navigate(['/dashboard']); // o la ruta que quieras como destino
    return false;
  }

  // Si no está autenticado, permitir acceso a login/register
  return true;
};
