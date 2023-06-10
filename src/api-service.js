export default async function fetchPhoto(q, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '37130379-4004eb1f0f9bfd5f433c52abe';
  const params = new URLSearchParams({
    key: API_KEY,
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: page,
  });

   const response = await fetch(
    `${BASE_URL}?${params}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}
