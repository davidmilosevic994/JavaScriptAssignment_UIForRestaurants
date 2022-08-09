"use strict";

var myHeaders = new Headers();

myHeaders.append(
  "Authorization",
  "Bearer V4p8ZnsYpezk3FVo37xzQRTSFadSyNodcFqqulhApcK7QYw7SknW8MyBWp37Qrpre77esru0VNnAlJbGXoAojac8jT2Jqx_qNXuX8dE-fdxXpFUMQOf7BxJxvNruYnYx"
);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

const buttonCategories = document.querySelector(".button-categories");
const productCards = document.querySelector(".cards");

const renderError1 = function (message) {
  buttonCategories.insertAdjacentText("beforeend", message);

  const renderError2 = function (message) {
    productCards.insertAdjacentText("beforeend", message);
  };
};

/**
 * This function loops through collected restaurants data from API and extracts
 * all name and add the into array that contains all individual restaurants category names.
 * Than it loops through that array of names and put that name into button element and
 * add that button element into parent element of all button elements.
 *
 * @param {Object} catData Data about restaurants.
 */
const showCategories = function (catData) {
  let catArray = [];
  catData.businesses.forEach(function (stores) {
    stores.categories.forEach(function (category) {
      if (!catArray.includes(category.title)) {
        catArray.push(category.title);
      }
    });
  });
  catArray.forEach(function (title) {
    const html = `
    <button class="btn">${title}</button>
    `;
    buttonCategories.insertAdjacentHTML("beforeend", html);
  });
};

/**
 * This function collect (GET) the data about restaurants from the given url, and than
 * calls showCategories function and pass to her collected data.
 */
const getCategoryData = async function () {
  try {
    const res = await fetch(
      "https://corsproxy.io/?https://api.yelp.com/v3/businesses/search?location=San Jose, CA 95127&term=restaurants",
      requestOptions
    );

    if (!res.ok) throw new Error(`Restaurants data cannot be found.`);

    const data = await res.json();

    showCategories(data);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError1(`💥 ${err.message}`);
  }
};

getCategoryData();

document
  .querySelector(".button-categories")
  .addEventListener("click", function (e) {
    function removeCard(card) {
      while (card.firstChild) {
        card.removeChild(card.firstChild);
      }
    }
    removeCard(productCards);

    if (e.target.className === "btn") {
      const id = e.target.innerText;

      getCategoryCard(id);
    }
  });
/**
 * This function collect (GET) the data about restaurants from the given url, and than
 * calls renderRes function and pass to her collected data and category name that she get
 * as argument.
 *
 * @param {string} event Extracted category name from clicked button.
 */
const getCategoryCard = async function (event) {
  try {
    let category = event;

    const res = await fetch(
      "https://corsproxy.io/?https://api.yelp.com/v3/businesses/search?location=San Jose, CA 95127&term=restaurants",
      requestOptions
    );

    if (!res.ok) throw new Error(`Restaurants data cannot be found.`);

    const data = await res.json();

    renderRes(data, category);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError2(`💥 ${err.message}`);
  }
};

/**
 * Search function for selected restaurant category.This function loops through collected restaurants data
 * from API and compares if restaurant category anme matches name that function have recived as argument.
 * If yes thant function render restaurant name on the page.
 *
 * @param {Object} apiData Data about restaurants.
 * @param {string} catTitle Extracted category name from clicked button.
 */
const renderRes = function (apiData, catTitle) {
  apiData.businesses.forEach(function (stores) {
    stores.categories.forEach(function (category) {
      if (category.title === catTitle) {
        const html = `
        <article onclick="clickCards(
          '${stores.url}'
        );" class="product-card">
          <div class="image">
            <img
              class="res_img" alt="Picture of food or restaurant"
              src="${stores.image_url}"
            />
          </div>
          <div class="res_data">
            <h3 class="res_name">${stores.name}</h3>
            <p class="res_rating">
               
               <span class="fa fa-star star-1 ${
                 stores.rating >= 1 ? "checked" : "unchecked"
               } "></span>
                <span class="fa fa-star star-2 ${
                  stores.rating >= 2 ? "checked" : "unchecked"
                } "></span>
                <span class="fa fa-star star-3 ${
                  stores.rating >= 3 ? "checked" : "unchecked"
                } "></span>
                <span class="fa fa-star star-4 ${
                  stores.rating >= 4 ? "checked" : "unchecked"
                } "></span>
                <span class="fa fa-star star-5 ${
                  stores.rating >= 5 ? "checked" : "unchecked"
                } "></span>
                <span class="res_price"> | ${
                  stores.price !== undefined ? stores.price : "nema"
                }</span>
            </p>
          </div>
          <a class="btn-a">View</a>
        </article>
        `;

        productCards.insertAdjacentHTML("beforeend", html);
      }
    });
  });
};

/**
 * This function loops through first 15 restaurants and fill the HTML elements with
 * collected data and render them on the page.
 *
 * @param {Object} data Data about restaurants.
 */
const showCards = function (data) {
  for (let i = 0; i < 15; i++) {
    const html = `
        <article onclick="clickCards(
          '${data.businesses[i].url}'
        );" class="product-card">
          <div class="image">
            <img
              class="res_img" alt="Picture of food or restaurant"
              src="${data.businesses[i].image_url}"
            />
          </div>
          <div class="res_data">
            <h3 class="res_name">${data.businesses[i].name}</h3>
            <p class="res_rating">
               
               <span class="fa fa-star star-1 ${
                 data.businesses[i].rating >= 1 ? "checked" : "unchecked"
               } "></span>
                <span class="fa fa-star star-2 ${
                  data.businesses[i].rating >= 2 ? "checked" : "unchecked"
                } "></span>
                <span class="fa fa-star star-3 ${
                  data.businesses[i].rating >= 3 ? "checked" : "unchecked"
                } "></span>
                <span class="fa fa-star star-4 ${
                  data.businesses[i].rating >= 4 ? "checked" : "unchecked"
                } "></span>
                <span class="fa fa-star star-5 last-star ${
                  data.businesses[i].rating >= 5 ? "checked" : "unchecked"
                } "></span>
                <span class="res_price"> | ${
                  data.businesses[i].price !== undefined
                    ? data.businesses[i].price
                    : ""
                }</span>
            </p>
          </div>
          <a class="btn-a">View</a>
        </article>
        `;
    productCards.insertAdjacentHTML("beforeend", html);

    loading.classList.remove("show");
  }
};

/**
 * This function collect (GET) the data about restaurants from the given url, and than
 * calls showCards function and pass to her collected data.
 */
const getData = async function () {
  try {
    const res = await fetch(
      "https://corsproxy.io/?https://api.yelp.com/v3/businesses/search?location=San Jose, CA 95127&term=restaurants",
      requestOptions
    );

    if (!res.ok) throw new Error(`Restaurants data cannot be found.`);

    const data = await res.json();

    showCards(data);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError2(`💥 ${err.message}`);
  }
};

getData();

const loading = document.querySelector(".three-balls");

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 5) {
    showLoading();
  }
});

/**
 * This function will show 3 dots animation that indicates 15 new
 * restaurant cards are laoding.
 *
 */
function showLoading() {
  loading.classList.add("show");
  setTimeout(getData, 1000);
}

const clickCards = function (url) {
  let a = document.createElement("a");
  a.target = "_blank";
  a.href = url;
  a.click();
};
