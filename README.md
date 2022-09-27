# LifeCraft

LifeCraft is a e-commerce website, inspired by Etsy, for listing and buying hand made items (referred to as crafts from here on out). This project features full CRUD (create, read, update, and delete) as well as authentication and authorization. Users will be able to browse available crafts listed for sale by clicking on the navigation links or by entering the craft's title in the search bar. They can also filter items by categories and price. In order to purchase crafts, the user must sign up for an account. For editing or deleting a craft, the user must sign up as a seller.

## Demo

![Demo LifeCraft](/public/images/demo.gif)

Click [here](https://www.youtube.com/watch?v=tLflt5IE7Mk) to see a video of all the features of this project and some code snippets.

Click [here](https://life-craft.herokuapp.com/api/v1) to visit the live site.

## Features

Users will be able to:

- Sign up (either for a regular or seller account)
- Login and logout
- Browse LifeCraft's listing
- Search for crafts by name
- Filter crafts by category and price
- View an individual craft's page with name, image, price, quantity, and buy button
- Add crafts to cart once they are registered
- Sign out and sign in with carts saved
- Update quantity and remove items in cart
- Checkout - will empty cart and update stock available
- Sellers will have access to their individual index page with their own search navigation
- Sellers have the ability to add new craft, edit and delete existing crafts

Additional features for the future:

- Purchase history page
- Add abilities for users who purchased a craft to leave a rating and review
- Show reviews on show page
- Each craft will be linked to a specific seller user for admin features

## RESTFUL Routes

| VERB | PATH                  | DESCRIPTION                              |
| ---- | --------------------- | ---------------------------------------- |
| POST | /register             | Allows new users to register             |
| POST | /login                | Allows existing users to login           |
| GET  | /api/v1/logout        | Allows signed in users to logout         |
| GET  | /api/v1/              | Home Page                                |
| GET  | /api/v1/crafts        | Index Page                               |
| GET  | /api/v1/crafts/filter | Index Page filtered by category or price |
| GET  | /api/v1/crafts/:id    | Show page for individual craft           |
| GET  | /api/v1/cart          | Cart Page                                |

The following routes require the user to be logged in

| VERB   | PATH                  | DESCRIPTION                                                             |
| ------ | --------------------- | ----------------------------------------------------------------------- |
| PUT    | /api/v1/cart          | Adds additional item to cart or updates quantity if it exists           |
| DELETE | /api/v1/cart/:itemId  | Removes the specified craft from cart                                   |
| DELETE | /api/v1/cart/checkout | Empties the cart and updates stock of each individual craft in the cart |

The following routes are protected (need authorization as a seller account)

| VERB   | PATH                           | DESCRIPTION                                                         |
| ------ | ------------------------------ | ------------------------------------------------------------------- |
| GET    | /api/v1/seller/crafts          | Shows a seller their profile page and crafts                        |
| PUT    | /api/v1/seller/crafts/filter   | Index Page filtered by category or price (seller's own crafts only) |
| GET    | /api/v1/seller/crafts/new      | Form to add additional craft                                        |
| POST   | /api/v1/seller/crafts          | Adds additional craft to database                                   |
| GET    | /api/v1/seller/crafts/:id/edit | Form for seller to edit listing                                     |
| PUT    | /api/v1/seller/crafts/:id/     | Updates listing                                                     |
| DELETE | /api/v1/seller/crafts/:id/     | Deletes a craft                                                     |

## Technologies Used

- HTML
- CSS
- JavaScript
- Node
- Express
- Mongo/Mongoose
- Redis

The following Node packages

- EJS/EJS Mate
- Passport
- Joi
- Connect Flash

## Interacting with the App Locally

For you to interact with the program on your local computer, please clone to your IDE using

```
git clone https://github.com/Yaosaur/LifeCraft.git
```

After cloning, install the required NPM packages using

```
npm install
```

Finally, create a .env file with the following environmental variables: `PORT`, `MONGO_URI`, `SESSION_SECRET`, `REDIS_HOSTNAME`, and `REDIS_PORT`, `REDIS_PASSWORD`.
There is also a seed file and route included. To seed your database, please uncomment out the following block of code in the server.js file and run the /seed route.

```
// app.get('/seed', async (req, res) => {
//   await Craft.deleteMany({});
//   await Craft.insertMany(craftsData);
//   res.send('done!');
// });
```

## Contribution Guidelines

If you see a feature not on the upcoming list, please make me a suggestion!

If you notice a bug while exploring my site, please report it [here](https://github.com/Yaosaur/LifeCraft/issues)

## Credits

Thank you to the many Etsy sellers for the pictures, prices, and description. If you see your listing used here and would like me to remove it, please contact me! The cat gif is from Gifer.
