const continents = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
}
    endpoint = 'https://restcountries.eu/rest/v2',
    LOCAL_STORAGE_KEY = 'countries';

let countryHolder, regioRadioButtons;

const saveCountry = (alpha2Code, add) => {
    const savedCountries = localStorage.LOCAL_STORAGE_KEY; //Hier een key gebruiken, maakt het dynamisch voor herbruikbaarheid
    const selectedRegion = document.querySelector('.js-region-radio:checked').value;
    if(!savedCountries && add){
        const initialData = {
            [selectedRegion]: {[alpha2Code]: true},
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
        return; //stap uit deze functie, het is afgehandeld
    } else {
        if(add) {
            const savedData = JSON.parse(savedCountries);
            if (savedData[selectedRegion]) {
                savedData[selectedRegion][alpha2Code] = true; //Key toevoegen aan bestaand (region) object
            
            } else {
            savedData[selectedRegion] = { [alpha2Code]: true}; //Nieuwe object toekennen aan (nieuwe) region

        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedData));
    } else {
        savedData = JSON.parse(savedCountries);
        delete savedData[selectedRegion][alpha2Code];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedData));

        }
    }

};

const listenToSavedCountries = () => {
    const countries = document.querySelectorAll('.js-country-input');
    console.log({countries});
    for (const country of countries) {
        country.addEventListener('change', function(){
            saveCountry(this.id, this.checked);
        });
        
    }

};

const searchLocalStorageFor = (alpha2Code) => {
    const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    const selectedRegion = document.querySelector('.js-region-radio:checked').value;

    if(!localData[selectedRegion][alpha2Code]){
        return 'checked';
    }else {
        return;
    }
}

const renderCountries = (countries) => {
    let countriesHTML ='';

    for (const {name, alpha2Code, flag, nativeName} of countries) {
        countriesHTML+= ` <section class="c-country">
        <input checked class="c-country__hidden-input o-hide-accessible js-country-input" type="checkbox" name="country" id="${alpha2Code}" ${searchLocalStorageFor(alpha2Code)}
        >
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
    listenToSavedCountries();


    // console.log(countries);
}

const getCountries = async (continent) => {
    const data = await get(`${endpoint}/region/${continent}`)
    console.log(data);
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