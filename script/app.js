const continents = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
}
    endpoint = 'https://restcountries.eu/rest/v2'

let countryHolder, regioRadioButtons;

const renderCountries = (countries) => {
    let countriesHTML ='';

    for (const {name, alpha2Code, flag, nativeName} of countries) {
        countriesHTML+= ` <section class="c-country">
        <input class="c-country__hidden-input o-hide-accessible" type="checkbox" name="country" id="${alpha2Code}">
        <label class="c-country__label" for="${alpha2Code}">
            <div class="c-country__flag-holder">
        <img class="c-country__flag" src="${flag}" alt="The Flag of ${name}">
            </div>
            <div class="c-country__details">
                <h2 class="c-country__name">${name}</h2>
                <span class="c-country__native-name">${nativeName}</span>
            </div>
        </label>
    </section> `;
    }

    countryHolder.innerHTML = countriesHTML;

    console.log(countries);
}

const getCountries = async (continent) => {
    const data = await get(`${endpoint}/region/${continent}`)

    renderCountries(data);
}

const enableNavigation = () =>{
    for (const radio of regioRadioButtons){
        radio.addEventListener('change', function(){
            console.log(this.value)
            getCountries(continents[this.value]);
        });
    }
}


const getDomElements = () => {
    countryHolder = document.querySelector('.js-countries');
    regioRadioButtons = document.querySelectorAll('.js-region-radio')


    getCountries(document.querySelector('.js-region-radio:checked').value);
    enableNavigation();
};

document.addEventListener('DOMContentLoaded', () => {
    getDomElements();

});