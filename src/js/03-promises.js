import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  btn: document.querySelector('button'),
};

refs.btn.addEventListener('click', startPromises);

let firstDelay = 0;
let amount = 0;
let delay = 0;

function startPromises(e) {
  e.preventDefault();

  delay = Number(refs.form.elements.delay.value);
  amount = Number(refs.form.elements.amount.value);
  step = Number(refs.form.elements.step.value);

  for (let i = 1; i <= amount; i++) {
    setTimeout(() => {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, delay);
    delay += step;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
  return promise;
}
