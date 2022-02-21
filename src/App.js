import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Forgetpass } from "./Forgetpass";

function App() {
  const History = useHistory();

  return (
    <div>
      <button onClick={() => History.push("/")}>sign up</button>
      <button onClick={() => History.push("/login")}>sign In</button>
      <div>
        <Switch>
          <Route exact path="/">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/forgetpass">
            <Forgetpass />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function Sucess() {
  return <div>Sucess</div>;
}

export default App;
