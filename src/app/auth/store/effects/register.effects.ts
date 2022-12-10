import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { AuthService } from 'src/app/auth/services/auth.service'
import {
  registerAction,
  registerFailureAction,
  registerSuccesAction,
} from '../actions/register.action'
import { PersistanceService } from 'src/app/shared/services/persistance.service'
import { Router } from '@angular/router'

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actons$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token)
            return registerSuccesAction({ currentUser })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log('ErrorResponse', errorResponse)
            return of(
              registerFailureAction({ errors: errorResponse.error.errors })
            )
          })
        )
      })
    )
  )

  redirectOnSubmitSuccess$ = createEffect(
    () =>
      this.actons$.pipe(
        ofType(registerSuccesAction),
        tap(() => {
          this.router.navigateByUrl('/')
        })
      ),
    { dispatch: false }
  )
  constructor(
    private authService: AuthService,
    private actons$: Actions,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
