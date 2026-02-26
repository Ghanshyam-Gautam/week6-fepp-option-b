import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddBookPage from "./pages/AddBookPage";
import BookPage from "./pages/BookPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            {/* Home page */}
            <Route path="/" element={<Home />} />

            {/* Add book page */}
            <Route path="/add-book" element={<AddBookPage />} />

            {/* FIXED: View a single book */}
            <Route path="/books/:id" element={<BookPage />} />

            {/* Catch-all Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;