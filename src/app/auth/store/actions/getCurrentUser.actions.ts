import { createAction, props } from '@ngrx/store'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { ActionTypes } from '../actionTypes'

export const getCurrentUserAction = createAction(ActionTypes.GET_CURRENT_USER)

export const getCurrentUserActionSucces = createAction(
  ActionTypes.GET_CURRENT_USER_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
)

export const getCurrentUserActionFailure = createAction(
  ActionTypes.GET_CURRENT_USER_FAILURE
)
