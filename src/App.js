import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Title from "./title";
import Navbar from "./navbar";
import CreateUpdateForm from "./createUpdateForm"
import BookList from "./bookList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (

    <div className="App">
        <Navbar/>
        <Router>
        <Switch>
        <Route path="/create" component={CreateUpdateForm} />
            <Route path="/list" component={BookList} />
            <Route path="" component={Title} />

        </Switch>
            </Router>
    </div>

  );
}

export default App;

