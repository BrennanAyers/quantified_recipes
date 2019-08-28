var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var cleanup = require('./helper/testCleanup');
var Recipe = require('../models').Recipe

describe('Calorie count api', () => {
  beforeEach(() => {
    cleanup(Recipe)
  })

  describe('Test Recipe path', () => {
    test('it can get recipes by calorie count when they exist in the database', () => {
      return Recipe.bulkCreate([{
        name: 'chicken dish',
        foodType: 'chicken',
        recipeUrl: 'www.chicken_recipe.com',
        recipeImage: 'image.com',
        ingredientList: '1 Chicken, 2 Lemons',
        ingredientCount: 2,
        calorieCount: 1900,
        servingCount: 4
      },
      {
        name: 'chicken dish',
        foodType: 'chicken',
        recipeUrl: 'www.chicken_recipe.com',
        recipeImage: 'image.com',
        ingredientList: '1 Chicken, 2 Lemons',
        ingredientCount: 2,
        calorieCount: 2000,
        servingCount: 4
      },
      {
        name: 'chicken dish',
        foodType: 'chicken',
        recipeUrl: 'www.chicken_recipe.com',
        recipeImage: 'image.com',
        ingredientList: '1 Chicken, 2 Lemons',
        ingredientCount: 2,
        calorieCount: 2100,
        servingCount: 4
      }])
      .then(recipes => {
        return request(app).get('/api/v1/recipes/calorie_search?calories=2000')
          .then(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body.length).toBe(3)
            expect(Object.keys(response.body[0])).toContain('id')
            expect(Object.keys(response.body[0])).toContain('name')
            expect(Object.keys(response.body[0])).toContain('recipeUrl')
            expect(Object.keys(response.body[0])).toContain('recipeImage')
            expect(Object.keys(response.body[0])).toContain('ingredientList')
            expect(Object.keys(response.body[0])).toContain('calorieCount')
            expect(Object.keys(response.body[0])).toContain('servingCount')
          })
        })
      })
    })
  })
