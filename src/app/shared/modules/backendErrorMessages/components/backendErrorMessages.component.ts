import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'mc-backend-errors-messages',
  templateUrl: './backendErrorMessages.html',
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: any //TODO: understand why it's not work with BackendErrorsInterface
  errorMessages: string[]

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map(
      (name: string) => {
        const messages = this.backendErrorsProps[name].join(' ')

        return `${name} ${messages}`
      }
    )
  }
}
