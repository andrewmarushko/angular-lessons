import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { PersistanceService } from './persistance.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistantServece: PersistanceService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.persistantServece.get('accessToken')
    req = req.clone({
      setHeaders: {
        Authorization: token ? `Token ${token}` : '',
      },
    })
    return next.handle(req)
  }
}
