import { Redirect, Route } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("access_token") === null ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);
export default PrivateRoute;
