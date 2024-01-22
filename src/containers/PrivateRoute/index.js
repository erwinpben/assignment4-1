import React, {useContext} from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth, AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserProvider"

export default function PrivateRoute({ component: Component, ...rest }) {
  // const { currentUser } = useAuth()
  const currentUser = useContext(AuthContext);
  const user = useContext(UserContext);

  console.log("this is current user: ",currentUser)
  return (
    <Route
      {...rest}
      render={props => {
        return user ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}