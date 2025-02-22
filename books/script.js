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

	const tableBody = document.querySelector("#bookTable tbody");
        tableBody.innerHTML = ""; // Clear existing content
	const bookArr = Array.from(books);
	bookArr.forEach(book => {
		const row = document.createElement("tr");
		row.innerHTML = `
		<td>${book.title || 'Unknown'}</td>
		<td>${book.author || 'Unknown'}</td>
		<td>${book.genre || 'N/A'}</td>
		<td>${book.recommender ? book.recommender : 'None'}</td>
	    `;
		tableBody.appendChild(row); 
	});
}

// Fetch all books on load
fetchBooks();

