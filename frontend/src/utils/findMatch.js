export default function findMatch(arr, obj) {
    return arr.find(
        (book) => book.author === obj.author && book.title === obj.title
    );
}
