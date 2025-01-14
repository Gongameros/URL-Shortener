import { Component } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { AuthService } from '../../services/auth.service';
import { LinkModel } from '../../interfaces/link-model';
import { formatDate } from '../../utils/date-utils';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-my-links',
  standalone: true,
  imports: [MatIcon, MatTableModule, MatSortModule],
  templateUrl: './my-links.component.html',
  styleUrls: ['./my-links.component.css'],
})
export class MyLinksComponent {
  private shortenedApiUrl = window.location.origin + '/shortened';
  linksSource: LinkModel[] = [];

  constructor(private linkService: LinkService, private authService: AuthService) {}

  ngOnInit() {
    this.linkService.getLinksByUsername().subscribe({
      next: (links) => {
        this.linksSource = links.map((link) => ({
          ...link,
          shortenedUrl: `${this.shortenedApiUrl}/${link.shortenedUrl}`,
          createdDate: formatDate(link.createdDate),
          expirationDate: formatDate(link.expirationDate),
        }));
        console.log('Fetched links:', this.linksSource); // Log fetched links
      },
      error: (err) => console.error('Error fetching links', err),
    });
  }

  deleteLink(linkId: number) {
    console.log(`Deleting Link with ID: ${linkId}`);
    if (this.linksSource) {
      this.linkService.deleteLink(linkId).subscribe({
        next: () => {
          this.linksSource = this.linksSource.filter((link) => link.id !== linkId);
        },
        error: (err) => console.error('Error deleting link', err),
      });
    } else {
      console.error('linksSource is undefined');
    }
  }
}
