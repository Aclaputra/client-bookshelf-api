import React, { useState, useEffect } from 'react'
import BookDataServices from '../services/BookServices'

const Book = props => {
  const initialTutorialState = {
    id: null,
    name: "",
    publisher: "",
    // published: false
  };
  const [currentBook, setCurrentBook] = useState(initialTutorialState);
  // const [message, setMessage] = useState("");
  const getBook = id => {
    BookDataServices.get(id)
      .then(response => {
        setCurrentBook(response.data.data.books);
        console.log(response.data.data.books);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getBook(props.match.params.id);
  }, [props.match.params.id]);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };
  // const updatePublished = status => {
  //   var data = {
  //     id: currentBook.id,
  //     name: currentBook.name,
  //     publisher: currentBook.publisher,
  //     published: status
  //   };
  //   BookDataServices.update(currentBook.id, data)
  //     .then(response => {
  //       setCurrentBook({ ...currentBook, published: status });
  //       console.log(response.data.data.books);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };
  const updateBook = () => {
    BookDataServices.update(currentBook.id, currentBook)
      .then(response => {
        console.log(response.data.data.books);
        // setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };
  const deleteBook = () => {
    BookDataServices.remove(currentBook.id)
      .then(response => {
        console.log(response.data.data.books);
        props.history.push("/books");
      })
      .catch(e => {
        console.log(e);
      });
  };

  // jsx
  return (
    <div>
      {currentBook ? (
        <div className="edit-form">
          <h4>Book</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Book</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="name"
                value={currentBook.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="publisher">Publisher</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="publisher"
                value={currentBook.publisher}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBook.published ? "Published" : "Pending"}
            </div> */}
          </form>
          {/* {currentBook.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )} */}
          <button className="badge badge-danger mr-2" onClick={deleteBook}>
            Delete
          </button>
          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBook}
          >
            Update
          </button>
          {/* <p>{message}</p> */}
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );

};

export default Book;