import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Author } from "../data/author.model";
import { HttpErrorResponse } from "@angular/common/http";

export const authorActions = createActionGroup({
  source: "Author",
  events: {
    "Load authors": emptyProps(),
    "Load authors sucess": props<{ author: Author[] }>,
    "Load authors failure": props<{ error: HttpErrorResponse }>(),
    "Add author": props<{ author: Author }>(),
    "Add author success": props<{ author: Author }>(),
    "Add author failure": props<{ error: HttpErrorResponse }>(),
    "Update author": props<{ author: Author }>(),
    "Update author success": props<{ author: Author }>(),
    "Update author failure": props<{ author: Author }>(),
    "delete author": props<{ id: number }>(),
    "delete author success": props<{ id: number }>(),
    "delete author failure": props<{ error: HttpErrorResponse }>(),
    "set current page": props<{ page: number }>(),
    "set page size": props<{ pageSize: number }>(),
  },
});
