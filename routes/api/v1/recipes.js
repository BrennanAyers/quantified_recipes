var express = require('express');
var router = express.Router();
var Sequelize = require('../../../models').Sequelize
var Op = Sequelize.Op;
var Recipe = require('../../../models').Recipe
var Edamam = require('../../../services/edamam').Edamam
var edamamService = new Edamam

router.get('/food_search', function(req, res, next) {
  Recipe.findAll({
    where: {
      foodType: req.query.q
    },
    limit: 3
  })
  .then(recipes => {
    if (recipes.length < 3) {
      edamamService.foodType(req.query.q)
      .then(data => {
        Recipe.bulkCreate(data)
        .then(recipeResources => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify(recipeResources));
        })
      })
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(recipes));
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({error});
  });
})

router.get('/calorie_search', function(req, res, next) {
  var maxCalories = req.query.calories + 101
  var minCalories = req.query.calories - 101
  Recipe.findAll({
    where: {
      foodType: req.query.q,
      calorieCount: {
        [Op.between]: [minCalories, maxCalories]
      }
    },
    limit: 3
  })
  .then(recipes => {
    if (recipes.length < 3) {
      edamamService.calorieTotal(req.query.q, req.query.calories)
      .then(data => {
        Recipe.bulkCreate(data)
        .then(recipeResources => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify(recipeResources));
        })
      })
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(recipes));
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({error});
  });
})

router.get('/ingredient_search', function(req, res, next) {
  Recipe.findAll({
    where: {
      foodType: req.query.q,
      ingredientCount: req.query.num_of_ingredients
    },
    limit: 3
  })
  .then(recipes => {
    if (recipes.length < 3) {
      edamamService.ingredientCount(req.query.q, req.query.num_of_ingredients)
      .then(data => {
        Recipe.bulkCreate(data)
        .then(recipeResources => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify(recipeResources));
        })
      })
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(recipes));
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({error});
  });
})

module.exports = router;
