import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [MatInputModule, MatIcon, MatCardModule, ReactiveFormsModule, CommonModule, MatDialogContent],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.css',
})
export class RegisterDialogComponent {
  private authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<RegisterDialogComponent>);
  matSnackBar = inject(MatSnackBar);
  fb = inject(FormBuilder);
  hide = true;
  form!: FormGroup;
  errorMessage: string | null = null;
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
    });
  }

  register() {
    this.authService.register(this.form.value).subscribe({
      next: (response) => {
        this.dialogRef.close();
        this.dialog.open(LoginDialogComponent, {
          panelClass: 'custom-modalbox',
          width: '350px',
        });
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
        console.log(error.message);
      },
    });
  }
}
