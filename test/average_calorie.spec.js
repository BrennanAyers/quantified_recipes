var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var cleanup = require('./helper/testCleanup');
var Recipe = require('../models').Recipe

describe('Average calorie path', () => {
  beforeEach(() => {
    cleanup(Recipe)
  })

  test('it can get the average calories of all foods in the database', () => {
    return Recipe.bulkCreate([{
      name: 'chicken dish',
      foodType: 'chicken',
      recipeUrl: 'www.chicken_recipe.com',
      recipeImage: 'image.com',
      ingredientList: '1 Chicken, 2 Lemons',
      ingredientCount: 2,
      calorieCount: 1000,
      servingCount: 4
    },
    {
      name: 'chicken dish',
      foodType: 'chicken',
      recipeUrl: 'www.chicken_recipe.com',
      recipeImage: 'image.com',
      ingredientList: '1 Chicken, 2 Lemons',
      ingredientCount: 2,
      calorieCount: 1300,
      servingCount: 4
    },
    {
      name: 'chicken dish',
      foodType: 'chicken',
      recipeUrl: 'www.chicken_recipe.com',
      recipeImage: 'image.com',
      ingredientList: '1 Chicken, 2 Lemons',
      ingredientCount: 2,
      calorieCount: 700,
      servingCount: 4
    }])
    .then(recipes => {
      return request(app).get('/api/v1/recipes/average_calories?q=chicken')
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body[0].averageCalories).toBe('1000.0000000000000000')
      })
    })
  })
})
