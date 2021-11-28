import './sass/main.scss';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import ImagesAPIService from './js/APIservice';
import Markup from './js/markup';

const formSearch = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

const imagesAPIService = new ImagesAPIService();
const renderMarkup = new Markup({ selector: galleryRef });

formSearch.addEventListener('submit', onFormSearch);
loadBtn.addEventListener('click', onLoadMore);

async function onFormSearch(e) {
  e.preventDefault();
  renderMarkup.reset();
  imagesAPIService.query = e.currentTarget.searchQuery.value.trim();

  if (imagesAPIService.query === '') {
    loadBtn.classList.add('is-hidden');
    return Notiflix.Notify.info('Your query is empty. Try again!');
  }

  imagesAPIService.resetPage();

  try {
    loadBtn.classList.remove('is-hidden');
    await fetchImages();
  } catch (error) {
    loadBtn.classList.add('is-hidden');
    return Notiflix.Notify.failure(error.message);
  }

  formSearch.reset();
}

async function onLoadMore() {
  try {
    await fetchImages();
  } catch {
    return Notiflix.Notify.failure(error.message);
  }
}

async function fetchImages() {
  
  try {
    loadBtn.disabled = true;
    const images = await imagesAPIService.fetchImages();
    renderMarkup.items = images;
    renderMarkup.render();
  } catch {
    return Notiflix.Notify.failure(error.message);
  }
   

  if (imagesAPIService.endOfHits) {
    return loadBtn.classList.add('is-hidden');
  }
  loadBtn.disabled = false
  loadBtn.textContent = 'Load more';
}

































// functionshowBtn() {
//     this.button.classList.remove('is-hidden');
//   }

// // Scroll page
// function pageScroll() {
//   const { height: formHeight } = formSerch.getBoundingClientRect();
//   const { height: cardHeight } = galleryRef.firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2 - formHeight * 2,
//     behavior: 'smooth',
//   });
// }







// import './sass/main.scss';
// import Notiflix from 'notiflix';
// import 'notiflix/dist/notiflix-3.2.2.min.css';
// import { apiSearch } from './js/apiSearch';
// import { markup } from './js/markup';

// const searchForm = document.querySelector('.search-form');
// const galleryRef = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');

// // export const refs = {
// //   searchForm: document.querySelector('.search-form'),
// //   gallery: document.querySelector('.gallery'),
// //   loadMore: document.querySelector('.load-more'),
// // };







// let page = 1;
// loadBtn.classList.add('is-hidden');
// // ________________________

// const KEY = '22757150-c2d7916cb8ffee93e4314d78c';
// const BASE_URL = 'https://pixabay.com/api';

// // ________________________

// searchForm.addEventListener('submit', onFormSearch);
// loadBtn.addEventListener('click', onLoadMore);

// async function onFormSearch (event) {
//     event.preventDefault();
//     // clearLightbox();
//     const value = searchForm.elements.searchQuery.value.trim();
    
//     if (!value) {
//       loadBtn.classList.add('is-hidden');
//       return Notiflix.Notify.info('Please, enter your request!')
//     }
    
//     const { totalHits } = await fetchImages(value)
    
//       if (!totalHits) {
//       loadBtn.classList.add('is-hidden');
//       return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
//     }
//     page = 1
//     fetchImages(value).then(renderPhoto).catch(error => error);
// }

// // ________________________

// async function fetchImages (value) {
//   const response = await fetch(
//     `${BASE_URL}/?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
//   );
//   page += 1;
//   return response.json();
// };

// // function fetchImages(value) {
// //   return fetch(`${BASE_URL}/?key=${KEY}&q=${value}&image_type=photo&pretty=true`).then(res=> {
// //     return res.json();
// // }).then(res=>res)
// // }



// function renderPhoto({ hits, totalHits }) {
//   // console.log(hits);
//   const pageLimit = Math.ceil(totalHits / hits.length);
//     const markup = hits.map(({
//         webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//       return `<a class="gallery__item" href="${largeImageURL}"><div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads ${downloads}</b>
//     </p>
//   </div>
// </div></a>`
//     }).join('');
//   // console.log(markup);
//   galleryRef.insertAdjacentHTML('beforeend', markup);

//   loadBtn.classList.remove('is-hidden');
//   if (page === pageLimit) {
//     setTimeout(() => {
//       Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
//       loadBtn.classList.add('is-hidden');
//     }, 0);

//   }
//   lightLiteBox = new SimpleLightbox('.gallery a', {
//         /* options */
//         captionsData: 'alt',
//         captionDelay: 250,
//   });
//   lightbox.refresh();
// }
// // console.log(gallery);

// function onLoadMore(e) {
//   const value = searchForm.elements.searchQuery.value;
//   fetchImages(value).then(renderPhoto).catch(error => error);
// }

// // function clearLightbox() {
// //     galleryRef.innerHTML = '';
// // }