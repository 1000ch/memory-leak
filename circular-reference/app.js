class Registry {
  constructor () {
    this.subscribers = [];
  }

  add (subscriber) {
    if(this.subscribers.indexOf(subscriber) >= 0){
      // Already registered so bail out
      return;
    }

    this.subscribers.push(subscriber);
  }

  remove (subscriber) {
    if(this.subscribers.indexOf(subscriber) < 0){
      // Not currently registered so bail out
      return;
    }

    this.subscribers.splice(this.subscribers.indexOf(subscriber), 1);
  }
}

class Leaker {
  constructor (name, parent, registry) {
    this.name = name;
    this.registry = registry;
    this.parent = parent;
    this.child = null;
    this.createChildren();
    this.registerCallback();
  }

  createChildren () {
    if (this.parent !== null) {
      // Only create child if this is the root
      return;
    }

    this.child = new Leaker('leaker 2', this, this.registry);
  }

  registerCallback () {
    this.registry.add(this);
  }

  dispose () {
    if (this.child !== null) {
      this.child.dispose();
    }

    this.registry.remove(this);
  }
}

window.onload = () => {
  window.leaker = null;
  const registry = new Registry();
  const create = document.querySelector('#js-create');
  const leak = document.querySelector('#js-leak');
  const dispose = document.querySelector('#js-dispose');

  create.addEventListener('click', () => {
    console.log('Create button is clicked.');

    if (window.leaker) {
      return;
    }

    window.leaker = new Leaker('leaker 1', null, registry);
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
