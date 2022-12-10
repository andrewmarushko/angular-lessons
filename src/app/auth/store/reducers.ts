import { Action, createReducer, on } from '@ngrx/store'

import { AuthStateInterface } from 'src/app/auth/types/authState.interface'
import { registerAction } from 'src/app/auth/store/actions/register.action'

const initialState: AuthStateInterface = {
  isSubmitting: false,
}

const AuthReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  )
)

export function reducers(state: AuthStateInterface, action: Action) {
  return AuthReducer(state, action)
}
