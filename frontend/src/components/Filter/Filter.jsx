import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
    setTitle,
    setAuthor,
    setOnlyFavoriteFilter,
    selectTitle,
    selectAuthor,
    selectOnlyFavoriteFilter,
    resetFilters,
} from "../../redux/slices/filterSlice";
import "./Filter.css";
export default function Filter() {
    const dispatch = useDispatch();
    const titleFilter = useSelector(selectTitle);
    const authorFilter = useSelector(selectAuthor);
    const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

    const handleTitleChange = (e) => {
        dispatch(setTitle(e.target.value));
    };
    const handleAuthorChange = (e) => {
        dispatch(setAuthor(e.target.value));
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };
    const handleOnlyFavoriteFilterChange = () => {
        dispatch(setOnlyFavoriteFilter());
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
                <div className="filter-group">
                    <div className="filter-check">
                        <div onClick={handleOnlyFavoriteFilterChange}>
                            {onlyFavoriteFilter ? (
                                <BsToggle2On className="icon on" />
                            ) : (
                                <BsToggle2Off className="icon off" />
                            )}
                        </div>
                        <div>Only favorite</div>
                    </div>
                </div>
                <button type="button" onClick={handleResetFilters}>
                    Reset
                </button>
            </div>
        </section>
    );
}
