import BookListing from "./BookListing";

const BookListings = ({ books }) => {
  if (books.length === 0) {
    return <p>No books found.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookListing key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookListings;