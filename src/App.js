import "./App.css";
import Signup from "../src/components/Signup";
import "./styles/global.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from '../src/components/Dashboard'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/enter-basic-info" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
