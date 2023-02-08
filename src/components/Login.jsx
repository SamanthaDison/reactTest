import { observer } from "mobx-react-lite"
import React from "react"
import { Link } from "react-router-dom"
import { AppState } from "../AppState.js"
import { AuthService } from "../services/AuthService.js"


// in react, everything is wrapped in function
// reverse of VUE: js up top and template on the bottom

function Login() {

  function login() {
    AuthService.loginWithRedirect()
  }

  function logout() {
    localStorage.removeItem('user-token')
    AuthService.logout({})
  }

  // NOTE this is a template here w/in the javascript
  // little section that returns HTML that may be utilized w/in your return below
  // think component here: anytime we use parenthesis we are creating 'components'
  // when we are writing 'jsx' we are writing javascript

  const notAuthenticated = (
    <button className="btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0" onClick={login}>Login</button>
  )

  const authenticated = (
    <div className="my-2 my-lg-0">
      <img src={AppState.account?.picture || AppState.user?.picture} alt="account photo" height="40" className="rounded selectable no-select" data-bs-toggle="dropdown"
        aria-expanded="false" />

      <div className="dropdown-menu dropdown-menu-lg-end dropdown-menu-start p-0" aria-labelledby="authDropdown">
        <div className="list-group">
          {/* Link is the new router-link */}
          {/* Using curly brackets 'breaks' you into standard js */}
          {/* Double curly's don't exist in react... see line 33 for 'interpolation' */}
          <Link to={'Account'}>
            <div className="list-group-item dropdown-item list-group-item-action">
              Manage Account
            </div>
          </Link>
          <div className="list-group-item dropdown-item list-group-item-action text-danger selectable" onClick={logout}>
            <i className="mdi mdi-logout"></i>
            logout
          </div>
        </div>
      </div>
    </div>
  )

  // this is your template section
  // this is saying render this or that from the above js
  return (
    <div>
      <span className="navbar-text">
        {!AppState.account?.id ? notAuthenticated : authenticated}
      </span>
    </div>
  )
}

// export default observer: makes the whole component (the return lines 57-63)
// ^^^ this return is quite literal to standard js returns
// without putting observer, it would not know to have reactive appstate
export default observer(Login)