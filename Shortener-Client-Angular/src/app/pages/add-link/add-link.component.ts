import { Component, inject } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { LinkService } from '../../services/link.service';  // Adjust the import path if necessary
import { CommonModule } from '@angular/common';
import { MatError, MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-link',
  standalone: true,
  imports: [FormsModule, CommonModule, MatLabel, MatFormField,
     MatError, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.css']
})
export class AddLinkComponent {
  message: string | null = null;
  form!: FormGroup;
  fb = inject(FormBuilder);
  private linkService = inject(LinkService);
  router = inject(Router);

  constructor() {
    this.form = this.fb.group({
      originalUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  submit() {
    if (this.form.valid) {
      const { originalUrl } = this.form.value;

      this.linkService.createLink(originalUrl).subscribe({
        next: (response: any) => {
          this.message = 'Link added successfully!';
          this.form.reset();
        },
        error: (err: any) => {
          console.error('Error adding link', err);
          this.message = 'Failed to add link. Please try again.';
        }
      });
    } else {
      this.message = 'Please fill in a valid URL.';
    }
  }
}
