'use strict';

const box = document.querySelector('.country');
const btn = document.querySelector('.btn');

const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
        // console.log(this.responseText);
        const [data] = JSON.parse(request.responseText);
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
            <button class="btn">Where am I</button>
        </div>
        `;
        box.insertAdjacentHTML('beforeend', html);
        box.style.opacity = 1;
    });
};

getCountryData('usa');

