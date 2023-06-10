import fetchPhoto from './api-service';
import Notiflix from 'notiflix';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let query = '';
let currentPage = 1;
let perPage = 40;
galleryEl.style.display = 'flex';
galleryEl.style.flexWrap = 'wrap';
galleryEl.style.marginTop = '30px';
galleryEl.style.gap = '20px';

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

function onFormSubmit(evt) {
  evt.preventDefault();
  galleryEl.innerHTML = '';
  loadMoreBtn.hidden = true;
  query = evt.currentTarget.elements.searchQuery.value;
  if (!query) {
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
        if (option.totalHits > perPage) {
          loadMoreBtn.hidden = false;
        }
        currentPage += 1;
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
  const { previewURL, tags, likes, views, comments, downloads } = obj;
  const markup = `
    <div class="photo-card">
  <img src="${previewURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`;
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function onLoadMore() {
  fetchPhoto(query, currentPage, perPage)
    .then(option => {
      currentPage += 1;
      option.hits.map(value => renderPhoto(value));
      const totalPages = option.totalHits / perPage;
      if (totalPages < currentPage) {
        loadMoreBtn.hidden = true;
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch(error => {
      console.log(error);
    });
}
