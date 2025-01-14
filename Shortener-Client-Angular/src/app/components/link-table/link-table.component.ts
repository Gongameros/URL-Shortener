import {
  AfterViewInit,
  Component,
  ContentChild,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { LinkModel } from '../../interfaces/link-model';
import { LinkService } from '../../services/link.service'; // Import your LinkService
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-link-table',
  standalone: true,
  imports: [MatTableModule, MatSortModule, CommonModule, MatIcon],
  templateUrl: './link-table.component.html',
  styleUrls: ['./link-table.component.css'],
})
export class LinkTableComponent implements AfterViewInit, OnChanges {
  @Input() data!: LinkModel[]; // Incoming data
  @Input() displayedColumns: string[] = []; // To allow passing displayed columns
  @Input() deleteLink!: (id: number) => void; // Function to delete link

  dataSource = new MatTableDataSource<LinkModel>();

  @ViewChild(MatSort) sort!: MatSort;

  private liveAnnouncer = inject(LiveAnnouncer);

  constructor(private linkService: LinkService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data) {
      console.log(changes['data']);
      this.dataSource.data = this.data;
      console.log(this.data);
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
}
