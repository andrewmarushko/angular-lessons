import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { PersistanceService } from 'src/app/shared/services/persistance.service'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { AuthService } from '../../services/auth.service'
import {
  loginAction,
  loginActionFailure,
  loginActionSuccess,
} from '../actions/login.actions'

@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.logIn(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token)
            return loginActionSuccess({ currentUser })
          }),
          catchError((errorResponce: HttpErrorResponse) => {
            return of(
              loginActionFailure({ errors: errorResponce.error.errors })
            )
          })
        )
      })
    )
  )

  redirectSuccessLogin$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(loginActionSuccess),
        tap(() => {
          this.router.navigateByUrl('/')
        })
      ),
    { dispatch: false }
  )

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
