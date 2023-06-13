export default function renderPhoto(obj) {
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
  return markup;
}
