import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userDetails: any;
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  dialogRef: MatDialogRef<ProfileComponent> = inject(MatDialogRef<ProfileComponent>);

  ngOnInit() {
    this.userDetails = this.authService.getUserDetail();
  }

  logout() {
    this.dialogRef.close();
    this.authService.logout(); // Directly calling the logout method
    this.router.navigate(['/home']); // Redirect to home page after logout
  }
}
