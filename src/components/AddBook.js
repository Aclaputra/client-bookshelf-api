import React, { useState } from 'react'
import BookDataServices from '../services/BookServices'

const AddBook = () => {
    const initialBookState = {
        id: null,
        name: "",
        year: "",
        author: "",
        summary: "",
        publisher: "",
    }
    const [book, setBook] = useState(initialBookState);
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value});
    };

    const saveBook = () => {
        var data = {
            name: book.name,
            publisher: book.publisher
        };
        BookDataServices.create(data)
        .then(response => {
            setBook({
                id: response.data.id,
                name: response.data.name,
                year: response.data.year,
                author: response.data.author,
                summary: response.data.summary,
                publisher: response.data.publisher,
            });
            setSubmitted(true);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const newBook = () => {
        setBook(initialBookState);
        setSubmitted(false);
    };
    // jsx
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={newBook}>
                    Add
                </button>
                </div>
            ) : (
                <div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={book.name}
                    onChange={handleInputChange}
                    name="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="publisher">Publisher</label>
                    <input
                    type="text"
                    className="form-control"
                    id="publisher"
                    required
                    value={book.publisher}
                    onChange={handleInputChange}
                    name="publisher"
                    />
                </div>
                <button onClick={saveBook} className="btn btn-success">
                    Submit
                </button>
                </div>
            )}
        </div>
    );
};

export default AddBook;