import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, switchMap, map } from 'rxjs/operators'
import { of } from 'rxjs'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { AuthService } from '../../services/auth.service'
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
          catchError(() => {
            return of(registerFailureAction())
          })
        )
      })
    )
  )

  constructor(private authService: AuthService, private actons$: Actions) {}
}
