import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>No book found</p>;

  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Available:</strong> {book.availability?.isAvailable ? "Yes" : "No"}</p>
      <p><strong>Due Date:</strong> {book.availability?.dueDate || "N/A"}</p>
      <p><strong>Borrower:</strong> {book.availability?.borrower || "N/A"}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default BookPage;