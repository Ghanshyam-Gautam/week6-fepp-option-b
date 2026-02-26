import { useState, useEffect } from "react";
import BookListings from "../components/BookListings";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");

        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await res.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="home">
      {loading && <p>Loading books...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <BookListings books={books} />}
    </div>
  );
};

export default Home;