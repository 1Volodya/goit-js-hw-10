// my key: 'x-api-key' , live_wdUHzFurdf2XF2HRzer2Qsq0VGEdN01zXeQAJvThTliu11XdrxNG3SBfzblmgQhZ

import axios from 'axios';

const API_KEY =
  'live_wdUHzFurdf2XF2HRzer2Qsq0VGEdN01zXeQAJvThTliu11XdrxNG3SBfzblmgQhZ';
const BASE_URL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  const apiUrl = `${BASE_URL}/breeds`;

  return axios
    .get(apiUrl)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const apiUrlInfoCat = `${BASE_URL}/images/search?breed_ids=${breedId}`;

  return axios
    .get(apiUrlInfoCat)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}


