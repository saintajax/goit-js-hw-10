import { refs } from '../index';

function renderCountry([{ name, capital, population, flags, languages }]) {
  refs.counryList.innerHTML = '';
  const capitalParse = capital.join(', ');
  const languagesParse = Object.values(languages).join(', ');
  let markup = `
  <div class="country__wrapper">
  <img class="country__img" src="${flags.svg}" width = "50"  alt="flag">
  <h1 class="country__title">${name.common}</h1>
  </div>
  <p class="country__text"><span class="country__span">Capital:</span> ${capitalParse}</p>
  <p class="country__text"><span class="country__span">Population:</span> ${population}</p>
  <p class="country__text"><span class="country__span">Languages:</span> ${languagesParse}</p>
  `;
  refs.countryInfo.innerHTML = markup;
}

function renderCountriesList(countries) {
  refs.countryInfo.innerHTML = '';
  let markup = countries
    .map(({ name, flags }) => {
      return `<li class="countries__item">
          <img class="countries__img" src="${flags.svg}" width = "30"  alt="flag">
          <p class="countries__text" >${name.common}</p>
          </li>`;
    })
    .join('');
  refs.counryList.innerHTML = markup;
}

export { renderCountry, renderCountriesList };
