import axios from "axios";
import Notiflix from 'notiflix';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

const formEl = document.querySelector('.search-form');
formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
    evt.preventDefault()
    console.log(formEl.elements.searchQuery.value);    
}

// https://pixabay.com/api/?key=37130379-4004eb1f0f9bfd5f433c52abe&q=yellow+flowers&image_type=photo&orientation=horizontal&safesearch=true



{/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>; */}