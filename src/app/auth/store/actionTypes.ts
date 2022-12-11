export enum ActionTypes {
  REGISTER = '[AUTH] Register',
  REGISTER_SUCCESS = '[AUTH] Register success',
  REGISTER_FAILURE = '[AUTH] Register failure',

  LOGIN = '[AUTH] Login',
  LOGIN_SUCCESS = '[AUTH] Login success',
  LOGIN_FAILURE = '[AUTH] Login failure',

  GET_CURRENT_USER = '[AUTH] Get current user',
  GET_CURRENT_USER_SUCCESS = '[AUTH] Get current user success',
  GET_CURRENT_USER_FAILURE = '[AUTH] Get current user failure',
}
