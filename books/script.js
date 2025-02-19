const API_BASE = "https://bookrecs.onrender.com";

async function fetchBooks(recommender = "") {
    const unique = document.getElementById("uniqueToggle").checked;
    let url = `${API_BASE}/books`;

    if (recommender) {
        url += `?recommender=${encodeURIComponent(recommender)}`;
        if (unique) url = `${API_BASE}/books/unique?recommender=${encodeURIComponent(recommender)}`;
    }

    try {
        const response = await fetch(url);
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

function displayBooks(books) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    if (books.length === 0) {
        bookList.innerHTML = "<p>No books found.</p>";
        return;
    }

    books.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.innerHTML = `<strong>${book.title}</strong> by ${book.author} (${book.genre || "Unknown Genre"})`;
        bookList.appendChild(bookItem);
    });
}

// Fetch all books on load
fetchBooks();

