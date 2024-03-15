import { useSelector, useDispatch } from "react-redux";
import {
    BsBookmarkStarFill,
    BsBookmarkStar,
    BsFillTrash3Fill,
} from "react-icons/bs";
import { deleteBook, toggleFavorite } from "../../redux/books/actionCreators";
import { selectTitle } from "../../redux/slices/filterSlice";
import "./BookList.css";

export default function BookList() {
    const books = useSelector((state) => state.books);
    const titleFilter = useSelector(selectTitle);
    const dispatch = useDispatch();
    const handleDeleteBook = (id) => {
        dispatch(deleteBook(id));
    };

    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };
    const filteredBooks = books.filter((book) => {
        return book.title.toLowerCase().includes(titleFilter.toLowerCase());
    });

    return (
        <section className="app-block book-list">
            <h2>Book list</h2>
            {filteredBooks.length ? (
                <ul>
                    {filteredBooks.map((book, i) => (
                        <li key={book.id}>
                            <div className="book-info">
                                {++i}. {book.title} <i>by</i>{" "}
                                <strong>{book.author}</strong>
                            </div>
                            <div className="book-actions">
                                <span
                                    onClick={() =>
                                        handleToggleFavorite(book.id)
                                    }
                                >
                                    {book.isFavorite ? (
                                        <BsBookmarkStarFill className="star-icon fill" />
                                    ) : (
                                        <BsBookmarkStar className="star-icon" />
                                    )}
                                </span>
                                <BsFillTrash3Fill
                                    className="delete-icon"
                                    onClick={() => handleDeleteBook(book.id)}
                                />
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
