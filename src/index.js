import fetchPhoto from './api-service';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a');
const target = document.querySelector('.js-guard');
let query = '';
let currentPage = 1;
let perPage = 40;

formEl.addEventListener('submit', onFormSubmit);
// loadMoreBtn.addEventListener('click', onLoadMore);

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onObserve, options);

function onFormSubmit(evt) {
  evt.preventDefault();
  galleryEl.innerHTML = '';
  //   loadMoreBtn.hidden = true;
  query = evt.currentTarget.elements.searchQuery.value;
  if (query === '' || query === ' ') {
    Notiflix.Notify.failure('What are you looking for?');
    return;
  }
  fetchPhoto(query, currentPage, perPage)
    .then(option => {
      if (option.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        option.hits.map(value => renderPhoto(value));
        observer.observe(target);
        lightbox.refresh();
        Notiflix.Notify.success(
          `"Hooray! We found ${option.totalHits} images."`
        );
        // if (option.totalHits > perPage) {
        //   loadMoreBtn.hidden = false;
        // }
      }
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      formEl.reset();
    });
}

function renderPhoto(obj) {
  const { previewURL, tags, likes, views, comments, downloads, largeImageURL } =
    obj;
  const markup = `
    <div class="photo-card"> 
  <a class="gallery__link" href="${largeImageURL}">
       <img src="${previewURL}" alt="${tags}" loading="lazy" height = "100"/>
   </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b> <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b> <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b> <span>${downloads}</span>
    </p>
  </div>
</div>`;
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

// Код для Infinity scroll

function onObserve(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentPage += 1;
      fetchPhoto(query, currentPage, perPage)
        .then(option => {
          option.hits.map(value => renderPhoto(value));
          lightbox.refresh();          
          const loadImg = currentPage * perPage;
          if (loadImg > option.totalHits) {
            observer.unobserve(target);
            Notiflix.Notify.failure(
              "We're sorry, but you've reached the end of search results."
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
}

// Код при використанні кнопки Load more

// function onLoadMore() {
//   currentPage += 1;
//   fetchPhoto(query, currentPage, perPage)
//     .then(option => {
//       option.hits.map(value => renderPhoto(value));
//       lightbox.refresh();
//       const loadImg = currentPage * perPage;
//       if (loadImg > option.totalHits) {
//         loadMoreBtn.hidden = true;
//         Notiflix.Notify.failure(
//           "We're sorry, but you've reached the end of search results."
//         );
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }
