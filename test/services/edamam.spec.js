var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');
var Edamam = require('../../services/edamam').Edamam
var edamamService = new Edamam

describe('Edamam API Service Tests', () => {
  test('It is an instance of Edamam', () => {
    expect(edamamService).toBeInstanceOf(Edamam)
  })
})
