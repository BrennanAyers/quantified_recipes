require('dotenv').config()
const fetch = require('node-fetch')

class Edamam {
  foodType(query) {

    return fetch(`https://api.edamam.com/search?q=${query}&app_id=${process.env.EDAMAM_API_ID}&app_key=${process.env.EDAMAM_API_KEY}&to=3&health=alcohol-free`)
    .then(response => {
      return response.json()
      .then(json => {
        let recipes = []
        json.hits.forEach(function(recipe) {
          recipes.push({
            name: recipe.recipe.label,
            foodType: query,
            recipeUrl: recipe.recipe.url,
            recipeImage: recipe.recipe.image,
            ingredientList: recipe.recipe.ingredientLines.join(','),
            ingredientCount: recipe.recipe.ingredientLines.length,
            calorieCount: recipe.recipe.calories,
            servingCount: recipe.recipe.yield
          })
        })
        return recipes
      })
    })
  }

  ingredientCount(query, num_of_ingredients) {
    return fetch(`https://api.edamam.com/search?q=${query}&ingr=${num_of_ingredients}&app_id=${process.env.EDAMAM_API_ID}&app_key=${process.env.EDAMAM_API_KEY}&to=3&health=alcohol-free`)
    .then(response => {
      return response.json()
      .then(json => {
        let recipes = []
        json.hits.forEach(function(recipe) {
          recipes.push({
            name: recipe.recipe.label,
            foodType: query,
            recipeUrl: recipe.recipe.url,
            recipeImage: recipe.recipe.image,
            ingredientList: recipe.recipe.ingredientLines.join(','),
            ingredientCount: recipe.recipe.ingredientLines.length,
            calorieCount: recipe.recipe.calories,
            servingCount: recipe.recipe.yield
          })
        })
        return recipes
      })
    })
  }

  calorieTotal(food, calories) {
   var maxCalories = calories + 100
   var minCalories = calories - 100
   return fetch(`https://api.edamam.com/search?q=${food}&app_id=${process.env.EDAMAM_API_ID}&app_key=${process.env.EDAMAM_API_KEY}&to=3&calories=${minCalories}-${maxCalories}`)
   .then(response => {
     return response.json()
     .then(json => {
       let recipes = []
       json.hits.forEach(function(recipe) {
         recipes.push({
           name: recipe.recipe.label,
           foodType: food,
           recipeUrl: recipe.recipe.url,
           recipeImage: recipe.recipe.image,
           ingredientList: recipe.recipe.ingredientLines.join(','),
           ingredientCount: recipe.recipe.ingredientLines.length,
           calorieCount: recipe.recipe.calories,
           servingCount: recipe.recipe.yield
         })
       })
       return recipes
     })
   })
 }
}

module.exports = {
  Edamam: Edamam
}
