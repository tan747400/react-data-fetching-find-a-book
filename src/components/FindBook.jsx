import React, { useState, useEffect } from "react";
import axios from "axios";

function FindBook() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("idle");

  async function handleSearch() {
    if (!query) return;
    setStatus("loading");
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
      );
      setBooks(response.data.items || []);
      setStatus("success"); 
    } catch {
      setStatus("error");
    }
  }

// async function data() {
//     const response = await axios.get(
//         `https://www.googleapis.com/books/v1/volumes?q=harry+potter`
//       );
//     console.log(response);
      
// }

// useEffect(() => {
//     data();
//   }, []); 

  // ฟอร์ม submit handler
  function handleSubmit(e) {
    e.preventDefault(); 
    handleSearch();
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Book Search</h1>

      {/* form ครอบ input + button */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book..."
          style={{ padding: "8px", width: "300px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "8px" }}>
          Search
        </button>
      </form>

      {/* แสดงสถานะ */}
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Fetching Error...</p>}

      {/* แสดงผลลัพธ์ */}
      {status === "success" && books.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {books.map((book) => (
            <li
              key={book.id}
              style={{
                display: "flex",
                alignItems: "center",
                margin: "10px 0",
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  style={{ marginRight: "15px", width: "80px" }}
                />
              )}
              <div>
                <strong>{book.volumeInfo.title}</strong>
                {book.volumeInfo.authors &&
                  ` by ${book.volumeInfo.authors.join(", ")}`}
              </div>
            </li>
          ))}
        </ul>
      )}
      {status === "success" && books.length === 0 && <p>No results found.</p>}
    </div>
  );
}

export default FindBook;

