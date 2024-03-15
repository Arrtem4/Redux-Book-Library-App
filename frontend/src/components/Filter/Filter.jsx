import { useDispatch, useSelector } from "react-redux";
import {
    setTitle,
    setAuthor,
    selectTitle,
    selectAuthor,
    resetFilters,
} from "../../redux/slices/filterSlice";
import "./Filter.css";
export default function Filter() {
    const dispatch = useDispatch();
    const titleFilter = useSelector(selectTitle);
    const authorFilter = useSelector(selectAuthor);

    const handleTitleChange = (e) => {
        dispatch(setTitle(e.target.value));
    };
    const handleAuthorChange = (e) => {
        dispatch(setAuthor(e.target.value));
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    return (
        <section className="app-block filter">
            <div className="filter-row">
                <div className="filter-group">
                    <input
                        type="text"
                        placeholder="Filter by title..."
                        onChange={handleTitleChange}
                        value={titleFilter}
                    ></input>
                </div>
                <div className="filter-group">
                    <input
                        type="text"
                        placeholder="Filter by author..."
                        onChange={handleAuthorChange}
                        value={authorFilter}
                    ></input>
                </div>
                <button type="button" onClick={handleResetFilters}>
                    Reset
                </button>
            </div>
        </section>
    );
}
