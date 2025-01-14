import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { formatDate } from '../../utils/date-utils';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatIcon,
    ReactiveFormsModule,
    RouterLink,
    MatSnackBarModule,
    CommonModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css',
})
export class LoginDialogComponent {
  readonly dialog = inject(MatDialog);
  openRegisterDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialogRef.close();
    this.dialog.open(RegisterDialogComponent, {
      panelClass: 'custom-modalbox',
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  private authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<LoginDialogComponent>);
  matSnackBar = inject(MatSnackBar);
  hide = true;
  form!: FormGroup;
  fb = inject(FormBuilder);

  errorMessage: string | null = null;

  login() {
    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        this.dialogRef.close();
        this.matSnackBar.open(formatDate(response.expiration), 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
      error: (error: Error) => {
        this.errorMessage = error.message;
      },
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
}
