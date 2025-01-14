import { Component, inject } from '@angular/core';
import { LinkTableComponent } from '../../components/link-table/link-table.component';
import { LinkModel } from '../../interfaces/link-model';
import { LinkService } from '../../services/link.service';
import { formatDate } from '../../utils/date-utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LinkTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private shortenedApiUrl = window.location.origin + '/shortened';
  linkService = inject(LinkService);
  linksSource: LinkModel[] = [];

  ngOnInit() {
    this.linkService.getLinks().subscribe({
      next: (links) => {
        this.linksSource = links.map((link) => ({
          ...link,
          shortenedUrl: `${this.shortenedApiUrl}/${link.shortenedUrl}`,
          createdDate: formatDate(link.createdDate),
          expirationDate: formatDate(link.expirationDate),
        }));
      },
      error: (err) => console.error('Error fetching links', err),
    });
  }
}
