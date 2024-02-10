
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

let lightbox = new SimpleLightbox('.image-card a', { captionsData: "alt" });

const API_KEY = '42176661-60cd7e02e4c469a287416d2c6';
const photoEl = document.querySelector('.photo-container-js');
const loadBtn = document.querySelector('.load-btn');
let currentPage = 1;
let currentSearchQuery = '';


function showLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    photoEl.appendChild(loader);
}

function hideLoader() {
    const loader = photoEl.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
}

function insertImages(images) {
    const imageCards = images.map(hit => {
        return `
            <li class="image-card">
                <a class="image-link" href="${hit.largeImageURL}">
                    <img src="${hit.webformatURL}" alt="${hit.tags}">
                </a>
                <div class="image-details">
                    <p class="detail">Likes ${hit.likes}</p>
                    <p class="detail">Views ${hit.views}</p>
                    <p class="detail">Comments ${hit.comments}</p>
                    <p class="detail">Downloads ${hit.downloads}</p>
                </div>
            </li>
        `;
    });

    const imageCardHTML = imageCards.join('');
    photoEl.insertAdjacentHTML('beforeend', imageCardHTML);
}

async function performSearch(searchQuery) {
    showLoader();
    currentSearchQuery = searchQuery;
    currentPage = 1;
    const imageType = 'photo';
    const orientation = 'horizontal';
    const safeSearch = true;

    try {
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: API_KEY,
                q: searchQuery,
                image_type: imageType,
                orientation: orientation,
            safesearch: safeSearch,
                per_page: 15,
                page: currentPage
            }
        });

        hideLoader();

        const data = response.data;

        const imageContainer = document.getElementById('gallery');
        imageContainer.innerHTML = '';

        if (parseInt(data.totalHits) > 0) {
            const images = data.hits.map(item => ({
                webformatURL: item.webformatURL,
                tags: item.tags,
                likes: item.likes,
                views: item.views,
                comments: item.comments,
                downloads: item.downloads,
                largeImageURL: item.largeImageURL,
            }));

            insertImages(images);

            lightbox.refresh();

            loadBtn.style.display = 'block';
        } else {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topCenter',
            });
        }
    } catch (error) {
        hideLoader();
        console.error('Error during fetch:', error.message);
    }
}


async function loadMoreImages() {
    currentPage++;
    try {
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: API_KEY,
                q: currentSearchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 15,
                page: currentPage
            }
        });

        const data = response.data;

        if (parseInt(data.totalHits) > 0) {
            const images = data.hits.map(item => ({
                webformatURL: item.webformatURL,
                tags: item.tags,
                likes: item.likes,
                views: item.views,
                comments: item.comments,
                downloads: item.downloads,
                largeImageURL: item.largeImageURL,
            }));

            insertImages(images);
            lightbox.refresh();


            if (currentPage * 15 >= parseInt(data.totalHits)) {
                document.querySelector('.load-btn').style.display = 'none';
                iziToast.error({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight',
                });
            }

    const cardHeight = document.querySelector('.image-card').getBoundingClientRect().height;
            
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth'
});

        } 
    } catch (error) {
        console.error('Error during fetch:', error.message);
    }
}

loadBtn.addEventListener('click', loadMoreImages);

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.js-search-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const searchInputValue = document.querySelector('.input').value;
        if (searchInputValue.trim() !== '') {
            performSearch(searchInputValue);
            loadBtn.style.display = 'none';
        } else {
            iziToast.error({
                message: 'Please enter a valid search query.',
                position: 'topRight',
            });
        }

        event.target.reset();
    });
    loadBtn.style.display = 'none';
});