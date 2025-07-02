// layout.component.ts - Versión actualizada
import { ChangeDetectionStrategy, Component, inject, OnInit, signal, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { ChangeLightDarkComponent } from "../../components/change-light-dark/change-light-dark.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Auth } from '../../services/auth';
import { User } from '../../shared/interface/login.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, ChangeLightDarkComponent, FooterComponent, RouterLink, CommonModule, RouterLinkActive, RouterModule],
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);

  // Signals para la información del usuario
  public user = signal<User | null>(null);
  public isAuthenticated = signal<boolean>(false);

  // Computed values para facilitar el acceso en el template
  public token = computed(() => this.isAuthenticated());
  public name = computed(() => this.user()?.name || '');
  public email = computed(() => this.user()?.email || '');
  public id_user = computed(() => this.user()?.id || null);

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData() {
    // Verificar si está autenticado
    this.isAuthenticated.set(this.auth.isAuthenticated());

    if (this.isAuthenticated()) {
      // Obtener usuario del localStorage primero
      const storedUser = this.auth.getUser();
      if (storedUser) {
        this.user.set(storedUser);
      }

      // Opcional: Actualizar datos desde el backend
      // this.refreshUserData();
    }
  }


  logout() {
    this.auth.logout();
    this.user.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}