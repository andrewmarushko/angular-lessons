import { createAction, props } from '@ngrx/store'

import { ActionTypes } from 'src/app/auth/store/actionTypes'
import { RegisterRequesrInterface } from 'src/app/auth/types/registerRequest.interface'

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<RegisterRequesrInterface>()
)
