const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const Chuck = require('chucknorris-io');



const app = express();
const client = new Chuck();


app.use(expressLayouts);
app.set('layout', 'main-layout');


// tell express to use static files from this public directory
app.use(express.static('public'));

// create an absolute path pointing to a folder called views
app.set('views', __dirname + '/views');

// tell express that EJS is in charge of rendering HTML
app.set('view engine', 'ejs');





// 1. ROOT ROUTE - HOMEPAGE
app.get('/', (req, res, next) => {
  console.log(req);
  res.render('index');
});



// 2. RANDOM ROUTE - DISPLAY A RANDOM JOKE
app.get('/random', (req, res, next) => {

  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then((response) => {
        console.log(response)

        res.render('random', {
          joke: response.value,
          jokeImg: response.iconUrl
        })
      // use the response here
    }).catch((err) => {
      // handle error
    });
  // console.log(req);
});



// 3. CATEGORIES ROUTE - DISPLAY JOKES BY CATEGORY
app.get('/categories', (req, res, next) => {
  // console.log(req);
  res.render('categories');
});



// 4. SEARCH ROUTE - SEARCH FOR A JOKE
app.get('/search', (req, res, next) => {
  // console.log(req);
  res.render('search');
});




// server started
app.listen(3000, () => {
  console.log("Chuck Norris App listening on port 3000");
});
