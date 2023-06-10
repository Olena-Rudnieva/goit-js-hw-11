import fetchPhoto from './api-service';
import axios from 'axios';
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
galleryEl.style.display = 'flex';
galleryEl.style.flexWrap = 'wrap';
galleryEl.style.marginTop = '30px';
galleryEl.style.gap = '20px';
loadMoreBtn.style.display = 'none';

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

function onFormSubmit(evt) {
  evt.preventDefault();
  galleryEl.innerHTML = '';
  currentPage = 1;
  loadMoreBtn.style.display = 'none';
  query = evt.currentTarget.elements.searchQuery.value;
  fetchPhoto(query, currentPage)
    .then(option => {
      if (option.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        currentPage += 1;
        option.hits.map(value => renderPhoto(value));
        loadMoreBtn.style.display = 'block';
      }
    })
    .catch(error => {
      console.log(error);
    })
      .finally(() => {
          formEl.reset();
      });
}

// axios.get('https://pixabay.com/api/?key=37130379-4004eb1f0f9bfd5f433c52abe&q=yellow+flowers&image_type=photo&orientation=horizontal&safesearch=true').then(data => console.log(data))

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
  fetchPhoto(query, currentPage)
    .then(option => {
      currentPage += 1;
      option.hits.map(value => renderPhoto(value));
    })
    .catch(error => {
      console.log(error);
    });
}
