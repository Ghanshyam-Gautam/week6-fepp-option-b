import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    genre: "",
    availability: {
      isAvailable: true,
      dueDate: "",
      borrower: ""
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing book
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error("Failed to fetch book");
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested availability fields
    if (name.startsWith("availability.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        availability: {
          ...formData.availability,
          [key]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Submit updated book
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to update book");

      navigate(`/books/${id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="create">
      <h2>Update Book</h2>

      <form onSubmit={handleSubmit}>
        <label>Book Title:</label>
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
        />

        <label>Author:</label>
        <input
          type="text"
          name="author"
          required
          value={formData.author}
          onChange={handleChange}
        />

        <label>ISBN:</label>
        <input
          type="text"
          name="isbn"
          required
          value={formData.isbn}
          onChange={handleChange}
        />

        <label>Publisher:</label>
        <input
          type="text"
          name="publisher"
          required
          value={formData.publisher}
          onChange={handleChange}
        />

        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          required
          value={formData.genre}
          onChange={handleChange}
        />

        <label>Available:</label>
        <select
          name="availability.isAvailable"
          value={formData.availability.isAvailable}
          onChange={handleChange}
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>

        <label>Due Date:</label>
        <input
          type="date"
          name="availability.dueDate"
          value={formData.availability.dueDate || ""}
          onChange={handleChange}
        />

        <label>Borrower:</label>
        <input
          type="text"
          name="availability.borrower"
          value={formData.availability.borrower || ""}
          onChange={handleChange}
        />

        <button>Update Book</button>
      </form>
    </div>
  );
};

export default EditBookPage;