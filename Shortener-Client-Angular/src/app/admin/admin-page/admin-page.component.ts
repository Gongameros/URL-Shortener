import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LinkService } from '../../services/link.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent {
  private linkService = inject(LinkService);
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);

  deleteUser(username: string) {
    if (!username) {
      this.snackBar.open('Please provide a username to delete links.', 'Close', { duration: 3000 });
      return;
    }

    this.userService.deleteUser(username).subscribe({
      next: () => {
        this.snackBar.open(`User ${username} was deleted successfully.`, 'Close', { duration: 3000 });
      },
      error: () => {
        console.error(`Error deleting user ${username}`);
        this.snackBar.open(`Error deleting user ${username}. Please try again later.`, 'Close', {
          duration: 3000,
        });
      },
    });
  }

  deleteUserLinks(username: any) {
    if (!username) {
      this.snackBar.open('Please provide a username to delete links.', 'Close', { duration: 3000 });
      return;
    }

    console.log('Username:', username);

    this.linkService.deleteLinksByUsername(username).subscribe({
      next: () => {
        console.log(`User links deleted for ${username}`);
        this.snackBar.open(`Links for user ${username} were deleted successfully.`, 'Close', { duration: 3000 });
      },
      error: (error) => {
        console.error(`Error deleting user links for ${username}: ${error}`);
        this.snackBar.open(`Error deleting links for ${username}. Please try again later.`, 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
