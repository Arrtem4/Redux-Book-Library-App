import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { setError } from "../../redux/slices/errorSlice";
import {
    addBook,
    fetchBook,
    selectBooks,
    selectIsLoadingViaAPI,
} from "../../redux/slices/booksSlice";
import createBook from "../../utils/createBook";
import booksData from "../../data/books.json";
import findMatch from "../../utils/findMatch";

import "./BookForm.css";
export default function BookForm() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const books = useSelector(selectBooks);
    const IsLoadingViaAPI = useSelector(selectIsLoadingViaAPI);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !author) {
            return dispatch(setError("Title and author are required"));
        }
        if (findMatch(books, { title, author })) {
            return dispatch(setError("Book already exists"));
        }
        const book = createBook({ title, author }, "manual");
        dispatch(addBook(book));
        setTitle("");
        setAuthor("");
    };
    const handleAddRandomBook = () => {
        const randomIndex = Math.floor(Math.random() * booksData.length);
        const randomBook = booksData[randomIndex];
        if (findMatch(books, randomBook)) {
            return dispatch(setError("Book already exists"));
        }
        const book = createBook(randomBook, "random");
        dispatch(addBook(book));
    };

    const handleAddRandomBookViaAPI = () => {
        dispatch(
            fetchBook("https://whatwiththereviews.onrender.com/api/random-book")
            // fetchBook("http://localhost:4000/random-book")
        );
    };

    return (
        <section className="app-block book-form">
            <h2>Add a new book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value.trim())}
                    ></input>
                </div>
                <div>
                    <label htmlFor="author">Author: </label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value.trim())}
                    ></input>
                </div>
                <button type="submit">Add book</button>
                <button type="button" onClick={handleAddRandomBook}>
                    Add random
                </button>

                <button
                    style={{ minWidth: "145px" }}
                    type="button"
                    disabled={IsLoadingViaAPI}
                    onClick={handleAddRandomBookViaAPI}
                >
                    {IsLoadingViaAPI ? (
                        <>
                            <span>Loading book...</span>
                            <FaSpinner className="spinner" />
                        </>
                    ) : (
                        <>Add random via API</>
                    )}
                </button>
            </form>
        </section>
    );
}
