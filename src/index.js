import SlimSelect from 'slim-select';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const loadingApi = document.querySelector('.loader');

showLoading();

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
      hideLoading();
      showBreed();
    });

    new SlimSelect({
      select: '#placeholderSingle',
      settings: {
        placeholderText: 'Choose a breed',
      },
    });
  })
  .catch(error => {
    Report.failure(
      'Oops!',
      'Something went wrong! Try reloading the page!',
      'Okay'
    );
    hideDreed();
    hideLoading();
    throw error;
  })
  .finally(() => {
    hideLoading();
  });

breedSelect.addEventListener('change', () => {
  showLoading();
  hideCat();
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
      .then(data => {
        const breedInfo = data[0].breeds[0];
        const name = breedInfo.name;
        const description = breedInfo.description;
        const temperament = breedInfo.temperament;
        const url = data[0].url;
        const markup = `
          <img src="${url}" alt="${name}"/>
          <div class="text-box">
            <h1 class="titleName">${name}</h1>
            <p class="text">${description}</p>
            <p class="text"><strong>Temperament:</strong> ${temperament}</p>
          </div>
        `;
        console.log(data);
        catInfoContainer.innerHTML = markup;
        showCat();
      })
      .catch(error => {
        Report.failure(
          'Oops!',
          'Something went wrong! Try reloading the page!',
          'Okay'
        );
        hideDreed();
        throw error;
      })
      .finally(() => {
        hideLoading();
      });
  }
});

function showLoading() {
  loadingApi.classList.remove('is-hidden');
}

function hideLoading() {
  loadingApi.classList.add('is-hidden');
}

function showBreed() {
  breedSelect.classList.remove('is-hidden');
}

function hideDreed() {
  breedSelect.classList.add('is-hidden');
}

function showCat() {
  catInfoContainer.classList.remove('is-hidden');
}

function hideCat() {
  catInfoContainer.classList.add('is-hidden');
}
