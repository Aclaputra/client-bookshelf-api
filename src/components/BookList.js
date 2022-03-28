import React, { useState, useEffect } from 'react';
import BookDataServices from '../services/BookServices';
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [currentBook, setCurrentBook] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");
    useEffect(() => {
      retrieveBooks();
    }, []);
    const onChangeSearchName = e => {
      const searchName = e.target.value;
      setSearchName(searchName);
    };
    const retrieveBooks = () => {
      BookDataServices.getAll()
        .then(response => {
          setBooks(response.data.data.books);
          console.log(response.data.data.books);
        })
        .catch(e => {
          console.log(e);
        });
    };
    const refreshList = () => {
      retrieveBooks();
      setCurrentBook(null);
      setCurrentIndex(-1);
    };
    const setActiveBook = (book, index) => {
      setCurrentBook(book);
      setCurrentIndex(index);
    };
    const removeAllBooks = () => {
      BookDataServices.removeAll()
        .then(response => {
          console.log(response.data.data.books);
          refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    };
    const findByName = () => {
      BookDataServices.findByName(searchName)
        .then(response => {
          setBooks(response.data.data.books);
          console.log(response.data.data.books);
        })
        .catch(e => {
          console.log(e);
        });
    };

    // jsx
    return (
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
                onChange={onChangeSearchName}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByName}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h4>Books List</h4>
            <ul className="list-group">
              {books &&
                books.map((book, index) => (
                  <li
                    className={
                      "list-group-item " + (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveBook(book, index)}
                    key={index}
                  >
                    {book.name}
                  </li>
                ))}
            </ul>
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={removeAllBooks}
            >
              Remove All
            </button>
          </div>
          <div className="col-md-6">
            {currentBook ? (
              <div>
                <h4>Book</h4>
                <div>
                  <label>
                    <strong>Name:</strong>
                  </label>{" "}
                  {currentBook.name}
                </div>
                <div>
                  <label>
                    <strong>Publisher:</strong>
                  </label>{" "}
                  {currentBook.publisher}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentBook.published ? "Published" : "Pending"}
                </div>
                <Link
                  to={"/books/" + currentBook.id}
                  
                >
                  <button className="btn btn-warning">
                      Edit
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Book...</p>
              </div>
            )}
          </div>
        </div>
    );
}

export default BookList;