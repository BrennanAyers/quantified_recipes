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
      expect(recipes.length).toBe(3)
      expect(Object.keys(recipes[0])).toContain('name')
      expect(recipes[0].foodType).toBe('chicken')
      expect(Object.keys(recipes[0])).toContain('recipeUrl')
      expect(Object.keys(recipes[0])).toContain('recipeImage')
      expect(Object.keys(recipes[0])).toContain('ingredientList')
      expect(Object.keys(recipes[0])).toContain('ingredientCount')
      expect(Object.keys(recipes[0])).toContain('calorieCount')
      expect(Object.keys(recipes[0])).toContain('servingCount')
    })
  })

  test('It can get recipes by food type and ingredient count', () => {
    return edamamService.ingredientCount('turkey', 3)
        .then(recipes => {
      expect(recipes.length).toBe(3)
      expect(Object.keys(recipes[0])).toContain('name')
      expect(recipes[0].foodType).toBe('turkey')
      expect(Object.keys(recipes[0])).toContain('recipeUrl')
      expect(Object.keys(recipes[0])).toContain('recipeImage')
      expect(Object.keys(recipes[0])).toContain('ingredientList')
      expect(Object.keys(recipes[0])).toContain('ingredientCount')
      expect(Object.keys(recipes[0])).toContain('calorieCount')
      expect(Object.keys(recipes[0])).toContain('servingCount')

      expect(recipes[0].ingredientCount).toBe(3)
      expect(recipes[1].ingredientCount).toBe(3)
      expect(recipes[2].ingredientCount).toBe(3)
    })
  })

  test('It can get recipes by food type and calories', () => {
    return edamamService.calorieTotal('turkey', 2000)

    .then(recipes => {
      expect(recipes.length).toBe(3)
      expect(Object.keys(recipes[0])).toContain('name')
      expect(recipes[0].foodType).toBe('turkey')
      expect(Object.keys(recipes[0])).toContain('recipeUrl')
      expect(Object.keys(recipes[0])).toContain('recipeImage')
      expect(Object.keys(recipes[0])).toContain('ingredientList')
      expect(Object.keys(recipes[0])).toContain('ingredientCount')
      expect(Object.keys(recipes[0])).toContain('calorieCount')
      expect(Object.keys(recipes[0])).toContain('servingCount')

      expect(recipes[0].ingredientCount).toBe(3)
      expect(recipes[1].ingredientCount).toBe(3)
      expect(recipes[2].ingredientCount).toBe(3)
    })
  })
})
