import { action, makeAutoObservable } from "mobx"
import { isValidProp } from "./utils/isValidProp.js"


class ObservableAppState {

  user = null
  /** @type {import('./models/Account.js').Account} */
  account = null

  posts = []

  newer = null
  older = null

  // makeAutoObservable comes from mobx library and essentially sets up your 'emits'
  // mobx is 2nd most popular appstate mngmt library for react 
  // create a class and make it observable 
  constructor() {
    makeAutoObservable(this)
  }

}

// BELOW: is the emit created by Jake

// with mobx if you want the reactive magic to happen it must occur within an action call
// this proxy below allows for you to not have to create an action for ea. value in your appstate

// eslint-disable-next-line no-undef
export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    action(() => {
      // where the reactive magic happens
      target[prop] = value
    })()
    return true
  }
})