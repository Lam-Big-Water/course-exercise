'use strict';

const modal = document.querySelector('.modal');
console.log(modal);

const btnModals = document.querySelectorAll('.show-modal');
console.log(btnModals);

const closeModal = document.querySelector('.close-modal');
console.log(closeModal);

const overlay = document.querySelector('.overlay');
console.log(overlay);


const close = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

const open = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};


for (let i = 0; i < btnModals.length; i++) {
    btnModals[i].addEventListener('click', open);
}

closeModal.addEventListener('click', close);
overlay.addEventListener('click', close);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        close();
    }
});
