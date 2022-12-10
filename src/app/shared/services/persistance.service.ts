import { Injectable } from '@angular/core'

@Injectable()
export class PersistanceService {
  get(key: string) {
    try {
      localStorage.getItem(key)
    } catch (error) {
      console.log('Cant get data from LocalStorage')
    }
  }

  set(key: string, data: any) {
    try {
      localStorage.setItem(key, data)
    } catch (error) {
      console.log('Cant set item in LocalStorage')
    }
  }
}
