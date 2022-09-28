import { renderCountry, renderCountriesList } from './renderMarkup';
import { showError, showWarning } from './messages';
import { refs } from '../index';

export function getCountryByName(country) {
  if (!country) {
    refs.counryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }
  fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(response => {
      if (response.length >= 10) {
        showWarning();
        return;
      } else if (response.length >= 2) {
        renderCountriesList(response);
      } else {
        renderCountry(response);
      }
    })
    .catch(error => {
      showError(error);
    });
}
