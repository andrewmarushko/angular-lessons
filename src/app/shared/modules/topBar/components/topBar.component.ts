import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import {
  currentUserSelector,
  isAnonymousSelector,
  isLoggedInSelector,
} from 'src/app/auth/store/selectors'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'

@Component({
  selector: 'mc-top-bar',
  templateUrl: './topBar.component.html',
})
export class TopBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean | null>
  isAnonymous$: Observable<boolean>
  currentUser$: Observable<CurrentUserInterface | null>

  constructor(private store: Store) {
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector))
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }

  ngOnInit(): void {}
}
