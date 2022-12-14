import { Action, createReducer, on } from '@ngrx/store'

import { AuthStateInterface } from 'src/app/auth/types/authState.interface'
import {
  registerAction,
  registerSuccesAction,
  registerFailureAction,
} from 'src/app/auth/store/actions/register.action'
import {
  loginAction,
  loginActionFailure,
  loginActionSuccess,
} from './actions/login.actions'
import {
  getCurrentUserAction,
  getCurrentUserActionFailure,
  getCurrentUserActionSucces,
} from './actions/getCurrentUser.actions'

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
  isLoading: false,
}

const AuthReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    registerSuccesAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
      validationErrors: null,
      isLoggedIn: true,
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    loginActionSuccess,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
      validationErrors: null,
      isLoggedIn: true,
    })
  ),
  on(
    loginActionFailure,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    getCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentUserActionSucces,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    getCurrentUserActionFailure,
    (state): AuthStateInterface => ({
      ...state,
      isLoggedIn: false,
      isLoading: false,
      currentUser: null,
    })
  )
)

export function reducers(state: AuthStateInterface, action: Action) {
  return AuthReducer(state, action)
}
