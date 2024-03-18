import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { selectErrorMessage } from "../../redux/slices/errorSlice";
import { clearError } from "../../redux/slices/errorSlice";

export default function Error() {
    const errorMessage = useSelector(selectErrorMessage);
    const dispatch = useDispatch();

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(clearError());
        }
    }, [errorMessage, dispatch]);

    return (
        <ToastContainer position="top-center" closeOnClick autoClose={3000} />
    );
}
