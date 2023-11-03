'use strict'

const computer = document.querySelector('.computer');

const modal = document.querySelector('.modal');
const btnClose = document.querySelector('.close');
console.log(computer,modal,btnClose);

const open = function () {
    modal.classList.remove('hidden');
};

const close = function () {
    modal.classList.add('hidden');
};

computer.addEventListener('click', open);
btnClose.addEventListener('click', close);

