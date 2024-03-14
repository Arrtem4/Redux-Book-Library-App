import { useDispatch, useSelector } from "react-redux";
import { setTitle, selectTitle } from "../../redux/slices/filterSlice";
import "./Filter.css";
export default function Filter() {
    const dispatch = useDispatch();
    const titleFilter = useSelector(selectTitle);

    const handleTitleChange = (e) => {
        dispatch(setTitle(e.target.value));
    };

    return (
        <section className="app-block filter">
            <div className="filter-group">
                <input
                    type="text"
                    placeholder="Filter by title..."
                    onChange={handleTitleChange}
                    value={titleFilter}
                ></input>
            </div>
        </section>
    );
}
