var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');
var Edamam = require('../../services/edamam').Edamam
var edamamService = new Edamam
var Recipe = require('../../models').Recipe

describe('Edamam API Service Tests', () => {
  test('It is an instance of Edamam', () => {
    expect(edamamService).toBeInstanceOf(Edamam)
  })

  test('It can get recipes by food type', () => {
    return edamamService.foodType('chicken')
    .then(recipes => {
      console.log(recipes)
      expect(recipes.length).toBe(3)
      expect(Object.keys(recipes[0])).toContain('name')
      expect(Object.keys(recipes[0])).toContain('recipeUrl')
      expect(Object.keys(recipes[0])).toContain('recipeImage')
      expect(Object.keys(recipes[0])).toContain('ingredientList')
      expect(Object.keys(recipes[0])).toContain('calorieCount')
      expect(Object.keys(recipes[0])).toContain('servingCount')
    })
  })
})
