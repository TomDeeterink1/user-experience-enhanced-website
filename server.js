// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Haal data op uit de FDND API, ga pas verder als de data gedownload is
const data = await fetchJson('https://fdnd-agency.directus.app/items/oba_item')

// console.log(data); // uncomment om de opgehaalde data te checken

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')
// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Maak een GET route voor de index
app.get('/', function (request, response) {
  // Render index.ejs uit de views map en geef uit FDND API opgehaalde data mee
  response.render('index', data)
})



const favorieten = [];

// GET route for a detail page with a request parameter id
app.get('/details/:id', function (request, response) {
    // Use the request parameter id to fetch the data from the API
    fetchJson(`https://fdnd-agency.directus.app/items/oba_item/${request.params.id}`)
        .then((items) => {
            response.render('details', { items: items.data, favorieten: favorieten });
        })
});

// POST route 
app.post('/details/:id', function (request, response) {
    // Push het huidige item door naar de favorieten array
    // uiteraard moet er is gefetched worden vanuit de api, zodat er de juist data gepost kan worden
    fetchJson(`https://fdnd-agency.directus.app/items/oba_item/${request.params.id}`)
        .then((item) => {
          // favorieten is in dit geval inrelevant, de item data is wel belangrijk
            favorieten.push(item.data);
            // Redirect back to the detail page
            response.redirect(303, '/details/' + request.params.id);
        })
});

// Maak een GET route voor de family overview
app.get('/account-overview/', function (request, response) {
  fetchJson(`https://fdnd-agency.directus.app/items/oba_profile`)
        .then((items) => {
            response.render('account-overview', { items: items.data ,  selectedItem: items.data , favorieten: favorieten});
        })
  
})

// POST route 
app.post('/account-overview/', function (request, response) {
  const itemId = request.body.carousel; // De ID van de geselecteerde persoon ophalen vanuit het formulier
  fetchJson(`https://fdnd-agency.directus.app/items/oba_profile/${itemId}`)
      .then((item) => {
          fetchJson(`https://fdnd-agency.directus.app/items/oba_profile`) // Fetch alle items opnieuw
          .then((items) => {
              response.render('account-overview', { 
                  items: items.data,
                  selectedItem: item.data, // De geselecteerde persoon data doorsturen naar de sjabloon
                  favorieten: favorieten
              });
          })
      })
});


// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})