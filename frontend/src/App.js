import NavbarComponent from "./Components/Layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Components/Layout/Footer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />
        <Switch>
          <Route path="/login" component={Login} exact={true} />
          <Route path="/register" component={Register} exact={true} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
