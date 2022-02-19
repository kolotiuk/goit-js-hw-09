import Notiflix from 'notiflix';

const formBtn = document.querySelector('.form');

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

const onButtonSubmitClick = event => {
    event.preventDefault();

    const currTarget = event.currentTarget.elements;
    let delay = Number(currTarget.delay.value);
    const step = Number(currTarget.step.value);
    const amount = Number(currTarget.amount.value);

    // let total = Number(delay);

    for (let i = 1; i <= amount; i += 1) {
        if (i === 1) {
            createPromise(i, delay).then(onResolve).catch(onReject);
        } else {
            delay += step;
            createPromise(i, delay).then(onResolve).catch(onReject);
        }
    }
};

formBtn.addEventListener('submit', onButtonSubmitClick);

const onResolve = ({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

const onReject = ({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};
