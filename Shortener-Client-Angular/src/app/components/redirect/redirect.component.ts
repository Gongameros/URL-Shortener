import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkService } from '../../services/link.service';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css'
})
export class RedirectComponent {
  constructor(
    private route: ActivatedRoute,
    private linkService: LinkService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const hashUrl = this.route.snapshot.paramMap.get('hashUrl');
    if (hashUrl) {
      this.linkService.getOriginalUrl(hashUrl).subscribe({
        next: (response) => {
          const originalUrl = response.originalUrl; // Adjust based on your API response
          window.location.href = originalUrl; // Redirect to the original URL
        },
        error: (err) => {
          console.error('Error fetching URL', err);
          this.router.navigate(['/home']); // Redirect to home on error
        },
      });
    }
  }
}
