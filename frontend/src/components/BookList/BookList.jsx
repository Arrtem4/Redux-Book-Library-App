import { useSelector } from "react-redux";
import "./BookList.css";

export default function BookList() {
    const books = useSelector((state) => state.books);

    return (
        <section className="app-block book-list">
            <h2>Book list</h2>
            {books.length ? (
                <ul>
                    {books.map((book, i) => (
                        <li key={i}>
                            <div className="book-info">
                                {++i}. '{book.title}' <i>by</i>{" "}
                                <strong>{book.author}</strong>
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
