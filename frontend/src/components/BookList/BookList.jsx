import { useSelector, useDispatch } from "react-redux";
import {
    BsBookmarkStarFill,
    BsBookmarkStar,
    BsFillTrash3Fill,
} from "react-icons/bs";
import {
    deleteBook,
    toggleFavorite,
    selectBooks,
} from "../../redux/slices/booksSlice";
import {
    selectTitle,
    selectAuthor,
    selectOnlyFavoriteFilter,
} from "../../redux/slices/filterSlice";
import "./BookList.css";

export default function BookList() {
    const books = useSelector(selectBooks);
    const titleFilter = useSelector(selectTitle);
    const authorFilter = useSelector(selectAuthor);
    const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);
    const dispatch = useDispatch();
    const handleDeleteBook = (id) => {
        dispatch(deleteBook(id));
    };

    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };
    const filteredBooks = books.filter((book) => {
        return (
            book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
            book.author.toLowerCase().includes(authorFilter.toLowerCase()) &&
            (onlyFavoriteFilter ? book.isFavorite : true)
        );
    });
    const highlightMatch = (text, filter) => {
        if (!filter) return text;
        const regex = new RegExp(`(${filter})`, "gi");
        return text.split(regex).map((substring, i) => {
            if (substring.toLowerCase() === filter.toLowerCase()) {
                return (
                    <span key={i} className="highlight">
                        {substring}
                    </span>
                );
            }
            return substring;
        });
    };

    return (
        <section className="app-block book-list">
            <h2>Book list</h2>
            {filteredBooks.length ? (
                <ul>
                    {filteredBooks.map((book, i) => (
                        <li key={book.id}>
                            <div className="book-info">
                                {++i}. {highlightMatch(book.title, titleFilter)}{" "}
                                <i>by</i>{" "}
                                <strong>
                                    {highlightMatch(book.author, authorFilter)}
                                </strong>
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
