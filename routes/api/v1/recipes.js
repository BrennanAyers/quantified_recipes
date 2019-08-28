var express = require('express');
var router = express.Router();
var Recipe = require('../../../models').Recipe

router.get('/food_search', function(req, res, next) {
  Recipe.findAll({
    where: {
      foodType: req.query.q
    },
    limit: 3
  })
  .then(recipes => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(recipes));
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({error});
  });
})

module.exports = router;
