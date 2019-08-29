# Quantified Recipes

Quantified Recipes is a Node.js application, using the Express framework, that keeps track of Recipes from the Edamam API, to be used alongside the [Quantified Shelf](https://github.com/BrennanAyers/quantified_shelf) microservice. Consider it the cookbook for your quantified self...
```
The quantified self refers both to the cultural phenomenon of self-tracking with technology and to a community of users and makers of self-tracking tools who share an interest in “self-knowledge through numbers.”
```

## Installation

Quantified Recipes uses the [Node Package Manager](http://npmjs.com) to manage dependencies. The instructions to run the application locally are below.

```bash
git clone git@github.com:BrennanAyers/quantified_recipes.git
cd quantified_recipes
npm install
```
This will install all required packages, including `dotenv`, which manages private information for individual users (Database Username/Password, API Keys). Since Quantified Recipes uses a Postgres database, we need to add `DB_USER` and `DB_PASS` to our `.env` file, like below:
```bash
touch .env
echo "DB_USER=YOUR_POSTGRES_USERNAME_HERE" >> .env
echo "DB_PASS=YOUR_POSTGRES_PASSWORD_HERE" >> .env
```
This will now allow us to initialize our database and put initial information in. We use the `sequelize` package to manage our Object-Relational Mapping.
```bash
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed
```
You will also need an API ID and Key from Edamam to interact with the Quantified Recipes application. You can do that by signing up for an acount [here](https://developer.edamam.com/edamam-recipe-api), and adding your credentials as follows:
```bash
echo "EDAMAM_API_ID=YOUR_API_ID_HERE" >> .env
echo "EDAMAM_API_KEY=YOUR_API_KEY_HERE" >> .env
```

## Usage
To start the local server and perform requests on your own database, we use the basic Node server process.
```bash
npm start
```
After this, you can make HTTP requests to your localhost using an application like Postman, or directly with cURL if that's your cup of tea.

## Endpoints
### Recipes
- `GET /api/v1/recipes/food_search?q=foodType`
will return 3 Recipe resources in the database with the `foodType` matching the `q` parameter in the request. This will return a comma separated list of Objects inside of an Array, with a 200 status code response. If 3 Recipes are not found in the database with the corresponding `foodType`, the application will reach out to Edamam for more Recipes.
- `GET /api/v1/recipes/calorie_search?q=foodType&calories=caloriesInteger`
will return 3 Recipe resources in the database with the `foodType` matching the `q` parameter in the request, and within a range of + or - 100 from the `calories` parameter in the request. This will return a comma separated list of Objects inside of an Array, with a 200 status code response. If 3 Recipes are not found in the database with the corresponding `foodType` and `calories` differential, the application will reach out to Edamam for more Recipes.
- `GET /api/v1/recipes/ingredient_search?q=foodType&ingredients=ingredientsInteger`
will return 3 Recipe resources in the database with the `foodType` matching the `q` parameter in the request, and matching the number of ingredients from the `ingredients` parameter in the request. This will return a comma separated list of Objects inside of an Array, with a 200 status code response. If 3 Recipes are not found in the database with the corresponding `foodType` and `ingredients`, the application will reach out to Edamam for more Recipes.

### Recipes Business Intelligence
- `GET /api/v1/recipes/average_calories?q=foodType` will return an Object containing the average value of all `calorieCounts` of all Recipes of the given `foodType` in the database. This endpoint will not reach out to Edamam in the case of no records, keeping all logic in the application.
- `GET /api/v1/recipes/ingredient_sort?amount=ASC_or_DESC` will return an Array of Recipes by the number of ingredients, ordered by the `amount` parameter given in the request, limited to 5 Recipes. This endpoint will not reach out to Edamam in the case of limited records, keeping all logic in the application.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
