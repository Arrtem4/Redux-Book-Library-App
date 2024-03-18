import { v4 as uuidv4 } from "uuid";
export default function createBook(book, source) {
    return {
        ...book,
        source,
        id: uuidv4(),
        isFavorite: false,
    };
}
