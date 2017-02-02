class Leaker {}

window.onload = () => {
  window.leaker = null;
  const create = document.querySelector('#js-create');
  const dispose = document.querySelector('#js-dispose');

  create.addEventListener('click', () => {
    console.log('Create button is clicked.');

    if (window.leaker) {
      return;
    }

    window.leaker = new Leaker();
  });

  dispose.addEventListener('click', () => {
    console.log('Dispose button is clicked.');

    window.leaker = null;
  });
};
