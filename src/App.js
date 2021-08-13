import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Title from "./title";
import Navbar from "./navbar";
import CreateForm from "./createForm";
import BookList from "./bookList";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UpdateForm                       from "./updateForm";
import Graphics                         from "./Graphics";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/create" component={CreateForm} />
          <Route path="/lists" component={BookList} />
          <Route path="/update/:id" component={UpdateForm}></Route>
          <Route path="/graphics" component={Graphics} />
          <Route path="" component={Title} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
