import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-dialog',
  standalone: true,
  imports: [],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.css',
})
export class ProfileDialogComponent {
  private authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<ProfileDialogComponent>);
  userDetails: any;

  ngOnInit() {
    this.userDetails = this.authService.getUserDetail();
  }

  logout() {
    this.authService.logout();
    this.dialogRef.close();
  }
}
