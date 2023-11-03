'use strict';
// basic
fetch(`https://restcountries.com/v3.1/name/china`)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })


const box = document.querySelector('.country');
const btn = document.querySelector('.btn');

const renderCountry = function (data) {
    let {flags, name, region, languages, population, currencies} = data;
        console.log(data);
    const html = `
        <img class="photo" src=${flags.png}>
        <div class="data">
            <h3 class="name">${name.common}</h3>
            <h4 class="region">${region}</h4>
            <p class="country__row"><span>👫</span>${population}</p>
            <p class="country__row"><span>🗣️</span>${languages.eng}</p>
            <p class="country__row"><span>💰</span>${currencies.USD.symbol}</p>
        </div>
        `;
        box.insertAdjacentHTML('beforeend', html);
        box.style.opacity = 1;
}

const getCountryData = function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => {
            if (!response.ok)
            throw new Error(`Country not found (${response.status})`);

            return response.json();
        })
        .then(data => {
            renderCountry(data[0]);
        })
};


btn.addEventListener('click', function () {
    getCountryData('usa');
})