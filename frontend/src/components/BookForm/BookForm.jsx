import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../redux/books/actionCreators";
import "./BookForm.css";

export default function BookForm() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() && author.trim()) {
            const book = {
                title,
                author,
            };
            dispatch(addBook(book));
            setTitle("");
            setAuthor("");
        }
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
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="author">Author: </label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    ></input>
                </div>
                <button type="submit">Add book</button>
            </form>
        </section>
    );
}
