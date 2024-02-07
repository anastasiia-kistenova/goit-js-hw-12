import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

 let lightbox = new SimpleLightbox('.image-card a', { captionsData: "alt",});
   


const API_KEY = '42176661-60cd7e02e4c469a287416d2c6';
const photoEl = document.querySelector('.photo-container-js');



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
        <img src="${hit.webformatURL}" alt="${hit.tags}"></a>
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


function performSearch(searchQuery) {
  showLoader();
  const imageType = 'photo';
  const orientation = 'horizontal';
  const safeSearch = true;
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: imageType,
    orientation: orientation,
    safesearch: safeSearch,

  });
  

  const URL = `https://pixabay.com/api/?${params}`;
 

  fetch(URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      hideLoader();

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

      } else {
        iziToast.error({
          message: "Sorry, there are no images matching your search query. Please try again!",
          position: 'topCenter',
        });
      }
    })
    .catch(error => {
      hideLoader();
      console.error('Error during fetch:', error.message);
    });
}




document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.js-search-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const searchInputValue = document.querySelector('.input').value;
        if (searchInputValue.trim() !== '') {
            performSearch(searchInputValue);
        } else {
            iziToast.error({
                message: 'Please enter a valid search query.',
                position: 'topRight',
            });
        }

        event.target.reset();
    });
});
