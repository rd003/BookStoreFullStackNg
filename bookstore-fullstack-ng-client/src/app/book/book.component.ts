import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { BookListComponent } from "./ui/book-list.component";
import { Store } from "@ngrx/store";
import { BookActions } from "./state/book.actions";
import { selectBooks } from "./state/book.selectors";
import { AsyncPipe, NgIf } from "@angular/common";
import { BookReadModel } from "./Data/book-read.model";
import { map, Observable, Subject, takeUntil } from "rxjs";
import { SortModel } from "../common/sort.model";
import { MatDialog } from "@angular/material/dialog";
import {
  selectAuthorError,
  selectAuthorLoading,
} from "../authors/state/author.selectors";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";
import { BookDialogComponent } from "./ui/book-dialog.component";
import { AuthorService } from "../authors/data/author.service";
import { GenreService } from "../genre/data/genre.service";
import { GenreModel } from "../genre/data/genre.model";
import { Author } from "../authors/data/author.model";

@Component({
  selector: "app-book",
  standalone: true,
  imports: [
    BookListComponent,
    NgIf,
    AsyncPipe,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  template: `
    <h1>Books</h1>
    <mat-spinner *ngIf="loading$ | async"></mat-spinner>
    <ng-container *ngIf="error$ | async as error"> </ng-container>
    <p>
      <button
        type="button"
        (click)="onAddUpdate('Add', null)"
        mat-raised-button
        color="accent"
      >
        +
      </button>
    </p>
    <ng-container *ngIf="books$ | async as books">
      <app-book-list
        [books]="books"
        (sort)="onSort($event)"
        (delete)="onDelete($event)"
        (edit)="onAddUpdate('Update', $event)"
      ></app-book-list>
    </ng-container>
  `,

  styles: [``],
})
export class BookComponent implements OnInit, OnDestroy {
  authorService = inject(AuthorService);
  genreService = inject(GenreService);
  dialog = inject(MatDialog);
  destroyed$ = new Subject<boolean>();
  store = inject(Store);
  loading$ = this.store.select(selectAuthorLoading);
  error$ = this.store.select(selectAuthorError);

  authors$: Observable<Author[]> = this.authorService
    .getAuthors({ pageSize: 1000 })
    .pipe(
      map((pl) => pl.items),
      takeUntil(this.destroyed$)
    );

  genres$: Observable<GenreModel[]> = this.genreService
    .getGenres()
    .pipe(takeUntil(this.destroyed$));

  books$: Observable<ReadonlyArray<BookReadModel>> =
    this.store.select(selectBooks);

  loadBooks() {
    this.store.dispatch(BookActions.loadBooks());
  }

  onSort(sort: SortModel) {
    this.store.dispatch(
      BookActions.setSortBy({
        sortBy: `${sort.sortColumn} ${sort.sortDirection}`,
      })
    );
    this.loadBooks();
  }

  onAddUpdate(action: string, book: BookReadModel | null = null) {
    const genres: Array<GenreModel> = [];
    const authors: Array<Author> = [];

    this.genres$.subscribe({
      next: (genres) => {
        genres = genres;
      },
      error: (error) => console.log,
    });
    this.authors$.subscribe({
      next: (authors) => {
        authors = authors;
      },
      error: (error) => console.log,
    });

    const dialogRef = this.dialog.open(BookDialogComponent, {
      data: { book, title: action + " Book", genres, authors },
    });
    dialogRef.componentInstance.submit
      .pipe(takeUntil(this.destroyed$))
      .subscribe((submittedBook) => {
        if (!submittedBook) return;
        if (submittedBook.id) {
          // update book
          this.store.dispatch(BookActions.updateBook({ book: submittedBook }));
        } else {
          this.store.dispatch(BookActions.addBook({ book: submittedBook }));
        }
        dialogRef.componentInstance.bookForm.reset();
        dialogRef.componentInstance.onCanceled();
      });
  }

  onDelete(book: BookReadModel) {
    if (
      window.confirm(`Are you sure to delete the record (book: ${book.title})?`)
    ) {
      this.store.dispatch(BookActions.deleteBook({ id: book.id }));
      this.loadBooks();
    }
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}
