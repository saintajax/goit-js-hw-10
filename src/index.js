import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  renderCountry,
  renderCountriesList,
  cleanMarkup,
} from './js/renderMarkup';
import { getCountryByName } from './js/fetchCountries';

var debounce = require('debounce');

const DEBOUNCE_DELAY = 300;

export const refs = {
  form: document.querySelector('#search-box'),
  counryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.form.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  let searchingItem = e.target.value.trim();
  if (!searchingItem) {
    console.log('clean markup');
    cleanMarkup();
    return;
  }
  getCountryByName(searchingItem)
    .then(data => {
      if (data.length >= 10) {
        Notify.warning(
          'Too many matches found. Please enter a more specific name.',
          cleanMarkup()
        );
        return;
      } else if (data.length >= 2) {
        renderCountriesList(data);
      } else {
        renderCountry(data);
      }
    })
    .catch(error => {
      Notify.failure(
        `Oops, there is no country with that name, ${error}`,
        cleanMarkup()
      );
    });
}
