const apiEndpoint = 'https://picsum.photos/v2/list';

const photoGallery = document.getElementById('photoGallery');
const Dropdown = document.getElementById('Dropdown');

let photos = [];
let authors = [];

async function fetchPhotos() {
    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();

        photos = data;

        authors = [...new Set(photos.map(photo => photo.author))];
        populateDropdown();
        displayPhotos(photos);
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

function displayPhotos(photosToDisplay) {
    photoGallery.innerHTML = '';

    photosToDisplay.forEach(photo => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <img src="${photo.download_url}" alt="Fotografie de ${photo.author}">
            <h2>Autor: ${photo.author}</h2>
            <p>Descriere statică</p>
        `;
        photoGallery.appendChild(card);
    });
}

Dropdown.addEventListener('change', () => {
    const selectedAuthor = Dropdown.value;
    
    if (selectedAuthor === 'all') {
        displayPhotos(photos);
    } else {
        const filteredPhotos = photos.filter(photo => photo.author === selectedAuthor);
        displayPhotos(filteredPhotos);
    }
});

fetchPhotos();
