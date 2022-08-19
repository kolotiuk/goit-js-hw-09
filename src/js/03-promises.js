import Notiflix from 'notiflix';
const formRef = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onForm(e) {
  e.preventDefault();

  const currTarget = e.currentTarget.elements;
  let delayValue = Number(currTarget.delay.value);
  const stepValue = Number(currTarget.step.value);
  const amountValue = Number(currTarget.amount.value);

  for (let i = 1; i <= amountValue; i += 1) {
    if (amountValue) {
      createPromise(i, delayValue)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
    delayValue += stepValue;
  }
}
formRef.addEventListener('submit', onForm);
