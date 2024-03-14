import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "../../redux/books/actionCreators";
import "./BookList.css";

export default function BookList() {
    const books = useSelector((state) => state.books);
    const dispatch = useDispatch();
    const handleDeleteBook = (id) => {
        dispatch(deleteBook(id));
    };

    return (
        <section className="app-block book-list">
            <h2>Book list</h2>
            {books.length ? (
                <ul>
                    {books.map((book, i) => (
                        <li key={book.id}>
                            <div className="book-info">
                                {++i}. {book.title} <i>by</i>{" "}
                                <strong>{book.author}</strong>
                            </div>
                            <div className="book-actions">
                                <button
                                    onClick={() => handleDeleteBook(book.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No books available</p>
            )}
        </section>
    );
}
