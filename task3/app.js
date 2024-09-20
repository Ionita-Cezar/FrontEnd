const apiEndpoint = 'https://picsum.photos/v2/list';

const photoGallery = document.getElementById('photoGallery');
const Dropdown = document.getElementById('Dropdown');

const paginationContainer = document.getElementById('pagination');

let photos = [];
let authors = [];

let currentPage = 1;
const itemsPerPage = 5;
let filteredPhotos = [];

async function fetchPhotos() {
    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();

        photos = data;

        authors = [...new Set(photos.map(photo => photo.author))];
        populateDropdown();
        
        filteredPhotos = photos;
        
        displayPhotos();
    } catch (error) {
        console.error('Eroare la preluarea datelor:', error);
    }
}

function populateDropdown() {
    authors.forEach(author => {
        const option = document.createElement('option');
        option.value = author;
        option.textContent = author;
        Dropdown.appendChild(option);
    });
}

function displayPhotos() {
    photoGallery.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const photosToDisplay = filteredPhotos.slice(startIndex, endIndex);

    photosToDisplay.forEach(photo => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <img src="${photo.download_url}" alt="Fotografie de ${photo.author}">
            <h2>Autor: ${photo.author}</h2>
            <p>Descriere statica</p>
        `;
        photoGallery.appendChild(card);
    });

    updatePagination();
}

function updatePagination() {
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(filteredPhotos.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('pagination-btn');
        
        if (i === currentPage) {
            pageButton.classList.add('active');
        }

        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayPhotos();
        });

        paginationContainer.appendChild(pageButton);
    }
}

Dropdown.addEventListener('change', () => {
    const selectedAuthor = Dropdown.value;

    if (selectedAuthor === 'all') {
        filteredPhotos = photos;
    } else {
        filteredPhotos = photos.filter(photo => photo.author === selectedAuthor);
    }

    currentPage = 1;
    displayPhotos();
});

fetchPhotos();
