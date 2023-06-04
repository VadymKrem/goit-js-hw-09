import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
};

const refs = {
  formUser: document.querySelector('form'),
  inputFirstDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
}

refs.formUser.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  const delay = Number(refs.inputFirstDelay.value);
  const step = Number(refs.inputStep.value);
  const amount = Number(refs.inputAmount.value);

  let changingDelay = delay;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, changingDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    changingDelay += step;
  }
}

