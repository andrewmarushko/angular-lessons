import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { PersistanceService } from 'src/app/shared/services/persistance.service'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { AuthService } from '../../services/auth.service'
import {
  getCurrentUserAction,
  getCurrentUserActionFailure,
  getCurrentUserActionSucces,
} from '../actions/getCurrentUser.actions'

@Injectable()
export class GetCurrentUserEffects {
  getCurrentUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistanceService.get('accessToken')
        if (!token) {
          return of(getCurrentUserActionFailure())
        }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return getCurrentUserActionSucces({ currentUser })
          }),
          catchError(() => {
            return of(getCurrentUserActionFailure())
          })
        )
      })
    )
  )

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService
  ) {}
}
