"use strict";

/* YELP API */

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
/* ERROR FUNCTIONS */

const buttonCategories = document.querySelector(".button-categories");
const productCards = document.querySelector(".cards");

const renderError1 = function (message) {
  buttonCategories.insertAdjacentText("beforeend", message);

  const renderError2 = function (message) {
    productCards.insertAdjacentText("beforeend", message);
  };
};
/* RENDERING CATEGORY BUTTONS */
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
  console.log(catArray);
};

const getCategoryData = async function () {
  try {
    const res = await fetch(
      "https://corsproxy.io/?https://api.yelp.com/v3/businesses/search?location=San Jose, CA 95127&term=restaurants",
      requestOptions
    );

    if (!res.ok) throw new Error(`Restaurants data cannot be found.`);

    const data = await res.json();
    console.log(data);
    showCategories(data);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError1(`💥 ${err.message}`);
  }
};

getCategoryData();

/* SEARCH RESTAURANTS BY CATEGORY */
document
  .querySelector(".button-categories")
  .addEventListener("click", function (e) {
    function removeCard(card) {
      while (card.firstChild) {
        card.removeChild(card.firstChild);
      }
    }
    removeCard(productCards);
    console.log(e.target);
    if (e.target.className === "btn") {
      const id = e.target.innerText;
      console.log(id);
      getCategoryCard(id);
    }
  });

const getCategoryCard = async function (event) {
  try {
    let category = event;

    const res = await fetch(
      "https://corsproxy.io/?https://api.yelp.com/v3/businesses/search?location=San Jose, CA 95127&term=restaurants",
      requestOptions
    );

    if (!res.ok) throw new Error(`Restaurants data cannot be found.`);

    const data = await res.json();
    console.log(data);
    renderRes(data, category);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError2(`💥 ${err.message}`);
  }
};

const renderRes = function (apiData, catTitle) {
  apiData.businesses.forEach(function (stores) {
    stores.categories.forEach(function (category) {
      if (category.title === catTitle) {
        const html = `
        <div onclick="location.href='${stores.url}';" class="product-card">
          <div class="image">
            <img
              class="res_img" alt="Picture of food or restaurant"
              src="${stores.image_url}"
            />
          </div>
          <div class="res_data">
            <h3 class="res_name">${stores.name}</h3>
            <p class="res_rating">
               
               <span class="fa fa-star ${
                 stores.rating >= 1 ? "checked" : "unchecked"
               } "></span>
                <span class="fa fa-star ${
                  stores.rating >= 2 ? "checked" : "unchecked"
                } "></span>
                <span class="fa fa-star ${
                  stores.rating >= 3 ? "checked" : "unchecked"
                } "></span>
                <span class="fa fa-star ${
                  stores.rating >= 4 ? "checked" : "unchecked"
                } "></span>
                <span class="fa fa-star ${
                  stores.rating >= 5 ? "checked" : "unchecked"
                } "></span>
                <span class="res_price"> | ${
                  stores.price !== undefined ? stores.price : "nema"
                }</span>
            </p>
          </div>
          <a href="${stores.url}" target="_blank" class="btn-a">View</a>
        </div>
        `;

        productCards.insertAdjacentHTML("beforeend", html);
      }
    });
  });
};

/* LIST 15 INITIAL CARDS */

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
               
               <span class="fa fa-star ${
                 data.businesses[i].rating >= 1 ? "checked" : "unchecked"
               } "></span>
                <span class="fa fa-star ${
                  data.businesses[i].rating >= 2 ? "checked" : "unchecked"
                } "></span>
                <span class="fa fa-star ${
                  data.businesses[i].rating >= 3 ? "checked" : "unchecked"
                } "></span>
                <span class="fa fa-star ${
                  data.businesses[i].rating >= 4 ? "checked" : "unchecked"
                } "></span>
                <span class="fa fa-star last-star ${
                  data.businesses[i].rating >= 5 ? "checked" : "unchecked"
                } "></span>
                <span class="res_price"> | ${
                  data.businesses[i].price !== undefined
                    ? data.businesses[i].price
                    : ""
                }</span>
            </p>
          </div>
          <a href="${data.url}" target="_blank" class="btn-a">View</a>
        </article>
        `;
    productCards.insertAdjacentHTML("beforeend", html);

    loading.classList.remove("show");
  }
};

const getData = async function () {
  try {
    const res = await fetch(
      "https://corsproxy.io/?https://api.yelp.com/v3/businesses/search?location=San Jose, CA 95127&term=restaurants",
      requestOptions
    );

    if (!res.ok) throw new Error(`Restaurants data cannot be found.`);

    const data = await res.json();
    console.log(data);
    showCards(data);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError2(`💥 ${err.message}`);
  }
};

getData();

/* INFINITyY SCROLL */

const loading = document.querySelector(".three-balls");

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  console.log({ scrollTop, scrollHeight, clientHeight });
  if (clientHeight + scrollTop >= scrollHeight - 5) {
    showLoading();
  }
});

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
