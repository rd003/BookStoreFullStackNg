import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AuthorService } from "./data/author.service";
import { catchError, Observable, of, shareReplay, tap } from "rxjs";
import { PagedList } from "../common/paged-list.model";
import { Author } from "./data/author.model";
import { AuthorListComponent } from "./ui/author-list.component";

@Component({
  selector: "app-author",
  standalone: true,
  imports: [NgIf, AsyncPipe, AuthorListComponent],
  template: `
    <app-author-list
      [authors]="authors"
      (edit)="onEdit($event)"
      (delete)="onDelete($event)"
    />
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorComponent {
  authors: Array<Author> = [
    { id: 1, authorName: "A1" },
    { id: 2, authorName: "A2" },
    { id: 3, authorName: "A3" },
  ];

  onEdit(author: Author) {
    console.log(author);
  }

  onDelete(author: Author) {
    if (
      window.confirm(
        `Are you sure to delete the record (authorName: ${author.authorName})?`
      )
    ) {
      console.log(author);
    }
  }
}
