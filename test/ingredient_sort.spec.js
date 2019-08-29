var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var cleanup = require('./helper/testCleanup');
var Recipe = require('../models').Recipe

describe('Ingredient Count Sorted Recipes Endpoint', () => {
  beforeEach(() => {
    cleanup(Recipe)
  })

  test('it can return a sorted list of ingredients descending', () => {
    return Recipe.bulkCreate([{
      name: 'chicken dish',
      foodType: 'chicken',
      recipeUrl: 'www.chicken_recipe.com',
      recipeImage: 'image.com',
      ingredientList: '1 Chicken, 2 Lemons',
      ingredientCount: 5,
      calorieCount: 2000,
      servingCount: 4
    },
    {
      name: 'turkey dish',
      foodType: 'turkey',
      recipeUrl: 'www.turkey_recipe.com',
      recipeImage: 'image.com',
      ingredientList: '1 Turkey, 2 Lemons',
      ingredientCount: 2,
      calorieCount: 2000,
      servingCount: 4
    },
    {
      name: 'pheasant dish',
      foodType: 'pheasant',
      recipeUrl: 'www.pheasant_recipe.com',
      recipeImage: 'image.com',
      ingredientList: '1 Pheasant, 2 Lemons',
      ingredientCount: 10,
      calorieCount: 2000,
      servingCount: 4
    }])
    .then(chickens => {
      return request(app).get('/api/v1/recipes/ingredient_sort?amount=desc')
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body[0].name).toBe('pheasant dish')
        expect(response.body[0].ingredientCount).toBe(10)
        expect(response.body[1].name).toBe('chicken dish')
        expect(response.body[1].ingredientCount).toBe(5)
        expect(response.body[2].name).toBe('turkey dish')
        expect(response.body[2].ingredientCount).toBe(2)
      })
    })
  })

  test('it can return a sorted list of ingredients ascending', () => {
    return Recipe.bulkCreate([{
      name: 'chicken dish',
      foodType: 'chicken',
      recipeUrl: 'www.chicken_recipe.com',
      recipeImage: 'image.com',
      ingredientList: '1 Chicken, 2 Lemons',
      ingredientCount: 5,
      calorieCount: 2000,
      servingCount: 4
    },
    {
      name: 'turkey dish',
      foodType: 'turkey',
      recipeUrl: 'www.turkey_recipe.com',
      recipeImage: 'image.com',
      ingredientList: '1 Turkey, 2 Lemons',
      ingredientCount: 2,
      calorieCount: 2000,
      servingCount: 4
    },
    {
      name: 'pheasant dish',
      foodType: 'pheasant',
      recipeUrl: 'www.pheasant_recipe.com',
      recipeImage: 'image.com',
      ingredientList: '1 Pheasant, 2 Lemons',
      ingredientCount: 10,
      calorieCount: 2000,
      servingCount: 4
    }])
    .then(chickens => {
      return request(app).get('/api/v1/recipes/ingredient_sort?amount=asc')
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body[0].name).toBe('turkey dish')
        expect(response.body[0].ingredientCount).toBe(2)
        expect(response.body[1].name).toBe('chicken dish')
        expect(response.body[1].ingredientCount).toBe(5)
        expect(response.body[2].name).toBe('pheasant dish')
        expect(response.body[2].ingredientCount).toBe(10)
      })
    })
  })

  test('it returns only 5 recipes in a sorted list of ingredients descending', () => {
    return Recipe.bulkCreate([{
      name: 'chicken dish',
      foodType: 'chicken',
      recipeUrl: 'www.chicken_recipe.com',
      recipeImage: 'image.com',
      ingredientList: '1 Chicken, 2 Lemons',
      ingredientCount: 5,
      calorieCount: 2000,
      servingCount: 4
    },
    {
      name: 'turkey dish',
      foodType: 'turkey',
      recipeUrl: 'www.turkey_recipe.com',
      recipeImage: 'image.com',
      ingredientList: '1 Turkey, 2 Lemons',
      ingredientCount: 2,
      calorieCount: 2000,
      servingCount: 4
    },
    {
      name: 'emu dish',
      foodType: 'emu',
      recipeUrl: 'www.emu_recipe.com',
      recipeImage: 'image.com',
      ingredientList: '1 Emu, 2 Lemons',
      ingredientCount: 2,
      calorieCount: 2000,
      servingCount: 4
    },
    {
      name: 'dodo dish',
      foodType: 'dodo',
      recipeUrl: 'www.dodo_recipe.com',
      recipeImage: 'image.com',
      ingredientList: '1 Dodo, 2 Lemons',
      ingredientCount: 2,
      calorieCount: 2000,
      servingCount: 4
    },
    {
      name: 'moa dish',
      foodType: 'moa',
      recipeUrl: 'www.moa_recipe.com',
      recipeImage: 'image.com',
      ingredientList: '1 Moa, 2 Lemons',
      ingredientCount: 2,
      calorieCount: 2000,
      servingCount: 4
    },
    {
      name: 'pheasant dish',
      foodType: 'pheasant',
      recipeUrl: 'www.pheasant_recipe.com',
      recipeImage: 'image.com',
      ingredientList: '1 Pheasant, 2 Lemons',
      ingredientCount: 10,
      calorieCount: 2000,
      servingCount: 4
    }])
    .then(chickens => {
      return request(app).get('/api/v1/recipes/ingredient_sort?amount=desc')
      .then(response => {
        expect(response.body.length).toBe(5)
      })
    })
  })
})
