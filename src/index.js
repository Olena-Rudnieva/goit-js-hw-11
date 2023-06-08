import axios from "axios";
import Notiflix from 'notiflix';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
galleryEl.style.display = 'flex';
galleryEl.style.flexWrap = 'wrap';
galleryEl.style.marginTop = '30px';
galleryEl.style.gap = '20px';

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault()
    const query = formEl.elements.searchQuery.value;  
    fetchPhoto(query)
      .then(option => {  
          option.hits.map(value => renderPhoto(value))
               
      })
      .catch(error => {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );      
        console.log(error);
      });
}

// axios.get('https://pixabay.com/api/?key=37130379-4004eb1f0f9bfd5f433c52abe&q=yellow+flowers&image_type=photo&orientation=horizontal&safesearch=true').then(data => console.log(data))

function fetchPhoto(q) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '37130379-4004eb1f0f9bfd5f433c52abe';

  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
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
