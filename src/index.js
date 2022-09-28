import './css/styles.css';
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
  getCountryByName(searchingItem);
}
