const searchFood = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  searchField.value = "";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then(response => response.json())
    .then(data => displayMeal(data.meals))
}

const displayMeal = meals => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  for (const meal of meals) {
    // console.log(meal)
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div onclick="loadDetails(${meal.idMeal})" class="card h-100">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
                </div>
              </div>
      `;
    searchResult.appendChild(div);
  }
}

const loadDetails = mealId => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data.meals[0]))
}


const displayDetails = meal => {
  const mealDetails = document.getElementById("meal-details");
  const div = document.createElement("div");
  div.classList.add("card")
  div.innerHTML = `
              <img src="${meal.strMealThumb}" class="card-img-top" alt="">
             <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0, 50)}</p>
              <a href="${meal.strYoutube}" class="btn btn-primary">See on Youtube </a>
            </div>
  `;
  mealDetails.appendChild(div);

}

