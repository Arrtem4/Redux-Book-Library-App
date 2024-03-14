import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addBook } from "../../redux/books/actionCreators";
import booksData from "../../data/books.json";
import "./BookForm.css";

export default function BookForm() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const books = useSelector((state) => state.books);
    const dispatch = useDispatch();

    const findMatch = (arr, obj) => {
        return arr.find(
            (book) => book.author === obj.author && book.title === obj.title
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && author && !findMatch(books, { title, author })) {
            const book = {
                title,
                author,
                id: uuidv4(),
            };
            dispatch(addBook(book));
            setTitle("");
            setAuthor("");
        }
    };
    const handleAddRandomBook = () => {
        const randomIndex = Math.floor(Math.random() * booksData.length);
        const randomBook = booksData[randomIndex];
        const book = {
            title: randomBook.title,
            author: randomBook.author,
            id: uuidv4(),
        };
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
