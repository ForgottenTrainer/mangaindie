// profile.component.ts - Versión corregida
import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { User } from '../../shared/interface/login.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SocialMediaComponent } from "../../components/social-media/social-media.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, SocialMediaComponent, RouterLink], // ¡IMPORTANTE! Necesario para el binding
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private auth = inject(Auth);
  private route = inject(ActivatedRoute);
  
  // Usar signals para reactividad
  public users = signal<User | null>(null);
  public isLoading = signal(false);
  public error = signal('');
  
  // Obtener ID de la ruta
  public id = this.route.snapshot.paramMap.get('id');

  ngOnInit() {
    // Mover la lógica del constructor a ngOnInit
    this.loadUserProfile();
  }

  private loadUserProfile() {
    if (!this.id) {
      this.error.set('ID de usuario no válido');
      return;
    }

    this.isLoading.set(true);
    this.error.set('');

    this.auth.user(this.id).subscribe({
      next: (res: User) => {
        console.log('Usuario obtenido:', res);
        this.users.set(res); // Usar .set() para actualizar el signal
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Error:', err);
        this.isLoading.set(false);
        this.error.set('Error al cargar el usuario');
      }
    });
  }

  refreshUser() {
    this.loadUserProfile();
  }
}