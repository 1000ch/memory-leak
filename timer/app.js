class Leaker {
  constructor () {
    this.interval = setInterval(this.onInterval, 100);
  }

  dispose () {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onInterval () {
    console.log('Interval');
  }
}

window.onload = () => {
  window.leaker = null;
  const create = document.querySelector('#js-create');
  const leak = document.querySelector('#js-leak');
  const dispose = document.querySelector('#js-dispose');

  create.addEventListener('click', () => {
    console.log('Create button is clicked.');

    if (window.leaker) {
      return;
    }

    window.leaker = new Leaker();
  });

  leak.addEventListener('click', () => {
    console.log('Leak button is clicked.');

    window.leaker = null;
  });

  dispose.addEventListener('click', () => {
    console.log('Dispose button is clicked.');

    window.leaker.dispose();
    window.leaker = null;
  });
};
