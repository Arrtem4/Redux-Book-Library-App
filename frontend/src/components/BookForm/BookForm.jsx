import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBook, selectBooks } from "../../redux/slices/booksSlice";
import createBook from "../../utils/createBook";
import booksData from "../../data/books.json";
import "./BookForm.css";

export default function BookForm() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const books = useSelector(selectBooks);
    const dispatch = useDispatch();

    const findMatch = (arr, obj) => {
        return arr.find(
            (book) => book.author === obj.author && book.title === obj.title
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && author && !findMatch(books, { title, author })) {
            const book = createBook({ title, author });
            dispatch(addBook(book));
            setTitle("");
            setAuthor("");
        }
    };
    const handleAddRandomBook = () => {
        const randomIndex = Math.floor(Math.random() * booksData.length);
        const randomBook = booksData[randomIndex];
        const book = createBook(randomBook);
        if (findMatch(books, book)) {
            return handleAddRandomBook();
        }
        dispatch(addBook(book));
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
            </form>
        </section>
    );
}
