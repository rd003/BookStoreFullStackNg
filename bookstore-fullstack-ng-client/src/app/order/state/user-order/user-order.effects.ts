import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { OrderService } from "../../data/order.service";
import { Store } from "@ngrx/store";
import { catchError, of, switchMap } from "rxjs";
import { selectUserOrderState } from "./user-order.selectors";
import { userOrderActions } from "./user-order.actions";

@Injectable()
export class UserOrderEffects {
  actions$ = inject(Actions);
  orderService = inject(OrderService);
  store = inject(Store);

  loadAuthors = createEffect(() =>
    this.actions$.pipe(
      ofType(userOrderActions.getUserOrder),
      concatLatestFrom(() => [this.store.select(selectUserOrderState)]),
      switchMap(([action, state]) =>
        this.orderService
          .getUserOrders({
            pageSize: state.pageSize,
            pageNumber: state.pageNumber,
            searchTerm: state.searchTerm ?? "",
            startDate: state.startDate,
            endDate: state.endDate,
            sortBy: state.sortBy,
          })
          .pipe(
            switchMap((data) => {
              // can I dispatch an action here?
              return [
                userOrderActions.getUserOrderSuccess({ orders: data.items }),
                userOrderActions.setTotalCount({ totalCount: data.totalCount }),
              ];
            }),
            catchError((error) =>
              of(userOrderActions.getUserOrderFailure({ error }))
            )
          )
      )
    )
  );
}
function concatLatestFrom(arg0: () => import("rxjs").Observable<any>[]): any {
  throw new Error("Function not implemented.");
}
