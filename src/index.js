import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import { debounce } from 'debounce';
var debounce = require('debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  form: document.querySelector('#search-box'),
  counryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.form.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  let searchingItem = e.target.value.trim();
  getCountryByName(searchingItem);
}

function getCountryByName(country) {
  fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(response => {
      if (response.length >= 10) {
        Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      } else {
        renderCountryList(response);
      }
    })
    .catch(error => {
      Notify.failure(`'Oops, there is no country with that name', ${error}`);
    });
}

function renderCountryList(countries) {
  if (countries.length > 1) {
    const markup = countries
      .map(({ name, flags }) => {
        console.log(flags.svg);
        return `<li>
        
          <p><svg viewBox="0 0 30 10"><use href="${flags.svg}" > </use></svg>${name.official}</p>
          </li>`;
      })
      .join('');
    refs.counryList.innerHTML = markup;
    return;
  }
  //   const markup = `
  //         <p>${country.name.official}</p>`;
  //   refs.countryInfo.innerHTML = markup;
}
