GetCountries();
const modal = document.querySelector(".modal");
const menu = document.querySelector(".menu");
const region = document.querySelectorAll(".region");
const search = document.getElementById("input");
const countriesEl = document.getElementById("section-countries");
async function GetCountries() {
  const response = await fetch("https://restcountries.eu/rest/v2/all");
  const myJson = await response.json(); //extract JSON from the http response
  displayCountries(myJson);
  // do something with myJson
}
// displaying ------------------------------------------------
function displayCountries(countries) {
  countriesEl.innerHTML = "";
  countries.forEach((country) => {
    const countryEl = document.createElement("div");
    countryEl.classList.add("country");
    countryEl.innerHTML = `
                  <div class="top">
                      <img class="flag" src="${country.flag}" alt="">
                  </div>
                  <div class="bottom">
                      <h1 class="names">${country.name}</h1>
                      <p class="population size"><strong class = "size">Population: </strong>${country.population}</p>
                      <p class="country-region size"><strong class = "size">Region: </strong>${country.region}</p>
                      <p class="Capital size"><strong class = "size">Capital: </strong>${country.capital}</p>
                  </div>
              `;
    //Deeper Details-------------------------------------
    countryEl.addEventListener("click", () => {
      const innerModal = document.createElement("div");
      innerModal.classList.add("model");
      innerModal.innerHTML = `<div class="left">
            <button id="back" class="back">
            <i class="fas fa-long-arrow-alt-left"></i>Back</button>
            <img src="${country.flag}" alt="">
        </div>
        <div class="right">
            <div class="right-left">
                <h1 class="names h1-modal">${country.name}</h1>
                <p class="text-modal"><strong class="size">Native Name: </strong>${
                  country.nativeName
                }</p>
                <p class="text-modal"><strong class="size">Population: </strong>${
                  country.population
                }</p>
                <p class="text-modal"><strong class="size">Region: </strong>${
                  country.region
                }</p>
                <p class="text-modal"><strong class="size">Sub Region: </strong>${
                  country.subregion
                }</p>
                <p class="text-modal"><strong class="size">Capital: </strong>${
                  country.capital
                }</p>
            </div>
            <div class="right-right">
                <p class="text-modal"><strong class="size">Top Level Domain: </strong>${
                  country.topLevelDomain[0]
                }</p>
                <p class="text-modal"><strong class="size">Currencies: </strong>${country.currencies.map(
                  (currency) => {
                    return currency.code;
                  }
                )}</p>
                <p class="text-modal"><strong class="size">Languages: </strong>${country.languages.map(
                  (language) => {
                    return language.name;
                  }
                )}</p>
            </div>
        </div>
        `;
      modal.appendChild(innerModal);
      modal.style.display = "block";
      // back button ------------------------------------------------
      const backBtn = document.querySelector("#back");
      backBtn.addEventListener("click", () => {
        modal.style.display = "none";
        modal.removeChild(innerModal);
      });
    });
    countriesEl.appendChild(countryEl);
  });
}
// menu -------------------------------------------
menu.addEventListener("click", () => {
  document.querySelector(".regions").classList.toggle("open");
  document.querySelector(".down").classList.toggle("rotate");
});

// Search ------------------------------------
search.addEventListener("input", (e) => {
  const value = e.target.value;
  const contryName = document.querySelectorAll(".names");
  contryName.forEach((countryName) => {
    if (countryName.innerText.toLowerCase().includes(value.toLowerCase())) {
      countryName.parentElement.parentElement.style.display = "block";
    } else {
      countryName.parentElement.parentElement.style.display = "none";
    }
  });
});

// filter by regions ----------------------------------------
region.forEach((filter) => {
  filter.addEventListener("click", () => {
    const countryRegion = document.querySelectorAll(".country-region");
    countryRegion.forEach((sikander) => {
      if (
        sikander.innerText
          .toLowerCase()
          .includes(filter.innerText.toLowerCase())
      ) {
        sikander.parentElement.parentElement.style.display = "block";
      } else if (filter.innerText == "All") {
        sikander.parentElement.parentElement.style.display = "block";
      } else {
        sikander.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

// dark mode---------------------------
document.querySelector(".dark-toggle-btn").addEventListener("click", () => {
  const body = document.querySelector("body");
  const header = document.querySelector("header");
  const input = document.querySelector("#input");
  const menu = document.querySelector(".menu");
  const ul = document.querySelector(".ul");
  const countryDark = document.querySelectorAll(".country");
  body.classList.toggle("dark-body");
  header.classList.toggle("dark-header");
  input.classList.toggle("dark-input");
  menu.classList.toggle("menu-dark");
  ul.classList.toggle("region-dark");
  countryDark.forEach((dark) => {
    dark.classList.toggle("country-dark");
  });
});
