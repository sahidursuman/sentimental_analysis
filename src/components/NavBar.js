import React from "react"
import { NavLink } from "react-router-dom"

class NavBar extends React.Component {

  render() {
    return (
      <div>
        <ul>
          <li>
            <NavLink to="/" className="normal" activeClassName="active" exact>Login</NavLink>
          </li>
          <li>
            <NavLink to="/NewYorkTimes" className="normal" activeClassName="active" exact>New York Times</NavLink>
          </li>
          <li>
            <NavLink to="/BBC" className="normal" activeClassName="active" exact>BBC</NavLink>
          </li>
          <li>
            <NavLink to="/Fox" className="normal" activeClassName="active" exact>Fox</NavLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default NavBar
