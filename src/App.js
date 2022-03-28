import { Switch, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import AddBook from './components/AddBook';
import Book from './components/Book';
import BookList from './components/BookList';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          Bookshelf API
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/books"} className="nav-link">
              Books
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/books"]} component={BookList} />
          <Route exact path="/add" component={AddBook} />
          <Route path="/books/:id" component={Book} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
