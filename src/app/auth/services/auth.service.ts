import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { RegisterRequestInterface } from '../types/registerRequest.interface'
import { map, Observable } from 'rxjs'
import { AuthResponseInterface } from 'src/app/shared/types/authResponce.interface'
import { environment } from 'src/environments/environment'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>(environment.apiUrl + '/users', data)
      .pipe(map((response: AuthResponseInterface) => response.user))
  }
}
