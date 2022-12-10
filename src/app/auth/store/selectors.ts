import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthStateInterface } from 'src/app/auth/types/authState.interface'

export const authFeatureKey = 'auth'
export const authFeatureSelector =
  createFeatureSelector<AuthStateInterface>(authFeatureKey)

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
)

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.validationErrors
)
