import BookList from "./components/BookList/BookList";
import BookForm from "./components/BookForm/BookForm";
import Filter from "./components/Filter/Filter";
import Error from "./components/Error/Error";
import { useDispatch } from "react-redux";
import { getBooksFromLocalStorage } from "./redux/slices/booksSlice";
import "./App.css";
import { useEffect } from "react";

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBooksFromLocalStorage());
    }, [dispatch]);
    return (
        <section className="app">
            <header className="app-header">
                <h1>Book Library App</h1>
            </header>
            <main className="app-main">
                <section className="app-left-column">
                    <BookForm />
                </section>
                <section className="app-right-column">
                    <Filter />
                    <BookList />
                </section>
            </main>
            <Error />
        </section>
    );
}
