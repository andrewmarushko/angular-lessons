import { HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { AuthService } from 'src/app/auth/services/auth.service'
import {
  registerAction,
  registerFailureAction,
  registerSuccesAction,
} from '../actions/register.action'

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() =>
    this.actons$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
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

  constructor(private authService: AuthService, private actons$: Actions) {}
}
