
// auth.guard.ts - Guard para proteger rutas (el que ya tienesimport { inject } from '@angular/core';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../../services/auth';


export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Si está autenticado, permitir acceso
  if (auth.isAuthenticated()) {
    return true;
  }

  // Si no está autenticado, redirigir al login
  console.log('Usuario no autenticado, redirigiendo al login...');
  router.navigate(['/login']);
  return false;
};