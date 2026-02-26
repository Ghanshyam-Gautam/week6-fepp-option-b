import { Link } from "react-router-dom";

const BookListing = ({ book }) => {
  return (
    <div className="book-preview">
      <h2>
        <Link to={`/books/${book._id}`}>{book.title}</Link>
      </h2>
      <p>Author: {book.author}</p>
      <p>Publisher: {book.publisher}</p>
      <p>Genre: {book.genre}</p>
    </div>
  );
};

export default BookListing;