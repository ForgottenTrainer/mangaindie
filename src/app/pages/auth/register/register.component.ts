import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FooterComponent } from "../../../components/footer/footer.component";
import { Router, RouterLink } from '@angular/router';
import SweetAlert from 'sweetalert2'
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FooterComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent { 
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  registerForm: FormGroup;
  isLoading = false;
  generalError = '';
  validationErrors: ValidationErrors = {};
  
  // Password strength properties
  passwordStrength = 0;
  passwordStrengthText = 'Empty';
  passwordRequirements = {
    minLength: false,
    lowercase: false,
    uppercase: false,
    numbers: false,
    specialCharacters: false
  };

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: any) {
    const password = form.get('password');
    const confirmPassword = form.get('password_confirmation');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  checkPasswordStrength() {
    const password = this.registerForm.get('password')?.value || '';
    
    // Reset requirements
    this.passwordRequirements = {
      minLength: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      specialCharacters: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };

    // Calculate strength
    const requirements = Object.values(this.passwordRequirements);
    const metRequirements = requirements.filter(req => req).length;
    
    this.passwordStrength = metRequirements;
    
    const strengthTexts = ['Empty', 'Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
    this.passwordStrengthText = strengthTexts[metRequirements] || 'Empty';
  }

  getStrengthBarClass(index: number): string {
    if (index < this.passwordStrength) {
      if (this.passwordStrength <= 2) return 'bg-red-500';
      if (this.passwordStrength <= 3) return 'bg-yellow-500';
      return 'bg-green-500';
    }
    return 'bg-gray-200 dark:bg-gray-700';
  }

  getRequirementClass(requirement: keyof typeof this.passwordRequirements): string {
    return this.passwordRequirements[requirement] ? 'text-green-600' : 'text-gray-500 dark:text-neutral-500';
  }

  hasError(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return (field?.invalid && field?.touched) || !!this.validationErrors[fieldName as keyof ValidationErrors];
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    
    // Server validation errors
    if (this.validationErrors[fieldName as keyof ValidationErrors]) {
      return this.validationErrors[fieldName as keyof ValidationErrors]![0];
    }

    // Client validation errors
    if (field?.invalid && field?.touched) {
      const errors = field.errors;
      if (errors?.['required']) return `${fieldName} is required`;
      if (errors?.['email']) return 'Please enter a valid email address';
      if (errors?.['minlength']) return `${fieldName} must be at least ${errors['minlength'].requiredLength} characters`;
      if (errors?.['mismatch']) return 'Passwords do not match';
    }

    return '';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.generalError = '';
      this.validationErrors = {};

      const formData = this.registerForm.value;

      this.authService.register(formData).subscribe({
        next: (response: any) => {
          // Save token
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('id_user', response.user.id.toString())
          localStorage.setItem('name', response.user.name)
          localStorage.setItem('email', response.user.email)
          
          // Navigate to home or dashboard
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.isLoading = false;
          
          if (error.status === 422 && error.error?.messages) {
            // Validation errors from server
            this.validationErrors = error.error.messages;
          } else {
            // General error
            this.generalError = error.error?.message || 'Registration failed. Please try again.';
          }
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      this.registerForm.markAllAsTouched();
    }
  }

  signUpWithGoogle() {
    // Implement Google Sign Up
    console.log('Google Sign Up clicked');
  }
}
