import { v4 as uuidv4 } from "uuid";
export default function createBook(book) {
    return {
        ...book,
        id: uuidv4(),
        isFavorite: false,
    };
}
