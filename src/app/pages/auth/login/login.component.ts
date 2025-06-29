import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FooterComponent } from "../../../components/footer/footer.component";
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../services/auth';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  imports: [FooterComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { 
  private fb = inject(FormBuilder);
  loginForm: FormGroup;
  auth = inject(Auth)
  router = inject(Router)

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let data = this.loginForm.value;

      this.auth.login(data).subscribe(
        (response) => {
            console.log('Login successful:', response);
            console.log(response)

            this.router.navigate(['home'])
        },
        (error) => {
            Swal.fire({
              title: "Error",
              text: "Usuario o contraseña incorrectos",
              icon: "error"
            });
        }
      );
    }
  }
}
