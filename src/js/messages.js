import { Notify } from 'notiflix/build/notiflix-notify-aio';

function showError(error) {
  Notify.failure(`Oops, there is no country with that name, ${error}`);
}

function showWarning() {
  Notify.warning('Too many matches found. Please enter a more specific name.');
}

export { showError, showWarning };
