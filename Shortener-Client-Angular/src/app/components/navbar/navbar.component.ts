import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LoginDialogComponent } from '../../dialogs/login-dialog/login-dialog.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { RegisterDialogComponent } from '../../dialogs/register-dialog/register-dialog.component';
import { ProfileDialogComponent } from '../../dialogs/profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  username: string | null = null;
  readonly dialog = inject(MatDialog);

  openLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LoginDialogComponent, {
      panelClass: 'custom-modalbox',
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openRegisterDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RegisterDialogComponent, {
      panelClass: 'custom-modalbox',
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openProfileDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.dialog.open(ProfileDialogComponent, {
      panelClass: 'custom-modalbox',
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
